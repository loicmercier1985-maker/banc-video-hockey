# Banc Vidéo Hockey

Application web installable (PWA) pour entraîneurs de hockey : analyse vidéo annotée, tableau de patinoire et pratiques animées sur demi-glace.

**Application :** https://loicmercier1985-maker.github.io/banc-video-hockey/

## Installer sur un appareil

- **Ordinateur (Chrome ou Edge)** : ouvrir l'adresse, puis l'icône *Installer* dans la barre d'adresse.
- **Android (Chrome)** : menu ⋮ → *Installer l'application*.
- **iPad / iPhone (Safari)** : *Partager* → *Sur l'écran d'accueil*.

Après la première ouverture avec internet, l'app fonctionne hors ligne.

## Données

Tout reste sur l'appareil (projets vidéo, notes, annotations, photos et vidéos des exercices). Rien de personnel n'est stocké dans ce dépôt.
Pour passer d'un appareil à l'autre : *Entraînements → Exporter / Importer* et *Projet → Enregistrer / Ouvrir un projet*.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (HTML, CSS et JavaScript dans un seul fichier) |
| `sw.js` | Fonctionnement hors ligne; changer `VERSION` à chaque publication |
| `manifest.webmanifest` | Nom, icône et couleurs de l'app installée |
| `icons/` | Icônes |

## Mises à jour

Chaque modification poussée sur `main` est publiée par GitHub Pages en 1 à 2 minutes. Les appareils reçoivent la nouvelle version à la réouverture de l'app.

## Synchronisation entre appareils (Supabase)

L'app peut synchroniser notes, annotations, pratiques modifiées, vidéos YouTube ajoutées, Mes exercices et tableaux enregistrés entre vos appareils. Les photos et vidéos importées restent sur chaque appareil.

### 1. Créer le projet (une fois)
1. Créer un compte gratuit sur https://supabase.com, puis **New project** (région : Canada Central). Notez le mot de passe de la base, il ne sert pas dans l'app.
2. **SQL Editor** → **New query** → coller puis **Run** :

```sql
create table public.bvh_data (
  user_id uuid primary key default auth.uid() references auth.users on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.bvh_data enable row level security;
create policy "lire ses données" on public.bvh_data for select using (auth.uid() = user_id);
create policy "créer ses données" on public.bvh_data for insert with check (auth.uid() = user_id);
create policy "modifier ses données" on public.bvh_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

3. **Authentication** → **URL Configuration** : mettre **Site URL** = `https://loicmercier1985-maker.github.io/banc-video-hockey/` et ajouter la même adresse dans **Redirect URLs**, puis **Save**. Le lien reçu par courriel ramène ainsi dans l'app. (Les modèles de courriel n'ont pas à être modifiés.)
4. **Project Settings** → **API** (ou **Data API** / **API Keys**) : copier l'**URL du projet** (`https://xxxx.supabase.co`) et la **clé publique** (`anon` ou `publishable`). Ne jamais utiliser la clé `service_role` / `secret`.

### 2. Relier chaque appareil
Dans l'app : icône **nuage** en haut à droite → coller l'URL et la clé → **Enregistrer** → courriel → **Recevoir le lien** → toucher le lien du courriel (ou, sur iPad, appui long sur le lien → Copier le lien, puis le coller dans l'app et **Se connecter**). Utiliser le même courriel sur tous les appareils.

La synchronisation se fait seule : à l'ouverture de l'app, quelques secondes après chaque modification et quand l'app passe en arrière-plan. Le point du nuage indique l'état (vert = à jour, bleu = en cours, orange = hors ligne ou déconnecté, rouge = erreur).
