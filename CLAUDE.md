# Banc Vidéo Hockey — notes de développement

- App PWA en un seul fichier : tout le code est dans `index.html` (HTML + CSS + JS, aucun outil de compilation).
- Publiée par GitHub Pages depuis la branche `main`, racine du dépôt (`.nojekyll` présent).
- À chaque publication : changer `VERSION` dans `sw.js` (format `bvh-AAAA-MM-JJx`) pour que les appareils reçoivent la mise à jour.
- Interface et contenu en français (Québec). Utilisateur : entraîneur M17 B, pratiques sur demi-glace partagée.
- Données des utilisateurs : seulement dans le navigateur (localStorage `bvh:*`, IndexedDB `bvh-entrainements`). Ne jamais casser la compatibilité de ces clés sans migration.
- Librairie : sous-onglets Drills / Skills (`d.lib==='skills'`), filtre 5 c 4 (`d.tag==='5c4'`), bouton Vidéo si vidéo importée (IndexedDB) ou `clip`/`vids`.
- Navigation : `setMode('home'|'train'|'video'|'lib'|'create')`. Accueil = planche à dessin (`HB`, clés `bvh:tableau` et `bvh:tableaux`); librairie = `libRender()`.
- Animation du tableau : `HB.anim={si,scen:[{name,steps:[{dur,p:{id:[x,y]},c:{id:ctrl},s:{id:'back'}}]}]}`; départ = positions des jetons; une étape ne garde que ce qui bouge. Rondelle à moins de `HB_PR` pieds d'un joueur = portée.
- Mes exercices : définitions dans `bvh:mesdrills` (repère des fiches + `board` pour rouvrir l'animation), conteneur `MES.C` ajouté à `PRATIQUES`. `drillToBoard()` convertit une fiche en tableau animé.
- Synchro : module `SY` (Supabase REST, connexion par code OTP courriel, table `bvh_data` une ligne par utilisateur). Fusion à trois voies `syMerge(base,local,distant)` avec `bvh:syncbase`; config dans `bvh:sync`. Appeler `syncSoon()` après toute écriture de données synchronisées.
- Contenu des pratiques et de la banque : tableau `PRATIQUES` dans `index.html` (repère 610 × 520, ligne rouge à gauche, filet à droite).
- Vidéos YouTube : intégrées (youtube-nocookie) seulement hors de claude.ai; liens sinon.
- Tester le JS après modification : extraire le bloc `<script>` principal et le passer à `new Function()` dans Node.
