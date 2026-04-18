# Publier sur le blog Viluma

Le blog Viluma tourne sur **Jekyll** (via GitHub Pages) avec un éditeur visuel fourni par **Pages CMS**. Les rédactrices ne touchent pas au code — elles écrivent les articles via une interface web sympa, et le site se met à jour tout seul.

---

## Première utilisation (à faire une seule fois par éditeur)

1. Aller sur https://app.pagescms.org/
2. Se connecter avec le compte GitHub qui a accès au dépôt Viluma.
3. Cliquer sur **Add a project** et choisir le dépôt `viluma`.
4. Pages CMS détecte automatiquement le fichier `.pages.yml` à la racine — aucune autre configuration nécessaire.
5. Bookmarker l'URL du projet pour les prochaines fois (ou utiliser le raccourci https://viluma-kinesitherapie.com/admin/).

---

## Écrire un nouvel article

1. Dans Pages CMS, ouvrir la collection **Articles de blog**.
2. Cliquer **+ Add entry**.
3. Remplir les champs :

| Champ | Description |
|---|---|
| **Titre de l'article** | Titre H1, ex. « 5 exercices pour soulager le mal de dos ». |
| **Date de publication** | Date du jour (ou planifiée — la date détermine l'ordre d'affichage). |
| **Auteur** | Liste déroulante : Sarah Maréchal ou Maroua Soussi. |
| **Image de couverture** | Photo 1200×630 px, JPG, < 300 Ko. Stockée automatiquement dans `/images/blog/`. |
| **Extrait / Résumé** | 2-3 phrases courtes — apparaît sur la liste du blog et dans Google. |
| **Catégories** | Une ou plusieurs : Kinésithérapie, Ostéopathie, Sport, Prévention, Seniors, Post-opératoire, Actualités. |
| **Tags** | Mots-clés libres, séparés par des virgules (ex. dos, exercices, boulogne-billancourt). |
| **Titre SEO** | Titre optimisé Google, max 60 caractères. Si vide, le titre principal est utilisé. |
| **Meta description** | Description Google, max 160 caractères. Si vide, l'extrait est utilisé. |
| **Image Open Graph** | Image qui s'affiche quand l'article est partagé sur Facebook, LinkedIn, etc. Optionnelle — par défaut la couverture. |
| **Mis en avant** | Cocher pour afficher l'article en grand en haut de `/blog`. |
| **Publié** | Décocher pour garder en brouillon (l'article ne sera pas visible). |
| **Contenu de l'article** | Éditeur riche : titres, paragraphes, listes, liens, images, citations. |

4. Cliquer **Save**. Pages CMS commit automatiquement le fichier Markdown dans `_posts/`. GitHub Pages reconstruit le site en 30 à 90 secondes.

---

## Conventions d'images

- **Image de couverture** : 1200×630 JPG, < 300 Ko (passer par https://squoosh.app pour compresser).
- **Images dans le corps** : largeur max 1600 px, JPG ou PNG.
- Tout est stocké sous `/images/blog/`.
- **Nom de fichier** : minuscules, traits d'union, pas d'espaces ni d'accents.
  - ✅ `exercices-dos-hero.jpg`
  - ❌ `Exercices Dos Héros.JPG`

---

## Checklist SEO avant publication

- [ ] Le **titre** est spécifique et fait moins de 70 caractères.
- [ ] Le **titre SEO** fait moins de 60 caractères.
- [ ] La **meta description** fait 140-160 caractères et contient le mot-clé principal.
- [ ] Au moins un mot-clé local est présent (« Boulogne-Billancourt », « Marcel Sembat », « 92100 »).
- [ ] L'**image de couverture** a un nom de fichier descriptif (= équivalent du alt).
- [ ] Le corps fait 800 à 1500 mots, avec un H2 tous les 200-300 mots.
- [ ] Au moins **un lien interne** vers `/soins.html`, `/equipe.html` ou un autre article.
- [ ] Un **CTA Doctolib ou téléphone** à la fin de l'article.

---

## Templates rapides

Trois structures d'articles qui marchent bien pour Viluma :

### 1. Article « conseils pratiques »
```
H1 : N conseils pour [problème]
Intro (3-4 phrases) — qui est concerné, pourquoi c'est important
H2 : 1. [Premier conseil] — explication + exercice/illustration
H2 : 2. [Deuxième conseil] — idem
...
H2 : Quand consulter un kinésithérapeute ?
CTA : Prendre RDV sur Doctolib
```

### 2. Article « comprendre une pathologie »
```
H1 : Comprendre [pathologie] : symptômes, causes, traitement
H2 : Qu'est-ce que [pathologie] ?
H2 : Quels sont les symptômes ?
H2 : Quelles sont les causes ?
H2 : Comment la kinésithérapie peut aider
H2 : Le protocole Viluma
CTA : Consulter au cabinet à Boulogne-Billancourt
```

### 3. Article « actualités cabinet »
```
H1 : [Annonce courte et claire]
Intro — ce qui change, depuis quand
Détails (qui, quoi, quand, comment)
Photo si possible
CTA : RDV ou contact
```

---

## Dépannage

- **Mon article n'apparaît pas sur le site.**
  → Vérifier que **Publié** est coché et que la date n'est pas dans le futur. Attendre 1-2 minutes le rebuild GitHub Pages.

- **L'image ne s'affiche pas.**
  → Vérifier que le chemin commence bien par `/images/blog/` et que le fichier a été commit par Pages CMS (un message « commit successful » apparaît).

- **La mise en forme est cassée (texte en gras partout, liens mauves…).**
  → Toujours utiliser la barre d'outils de l'éditeur Pages CMS. **Ne jamais coller depuis Word ou Google Docs** sans nettoyer — passer par un éditeur de texte simple (Notes Apple, Bloc-notes) entre les deux.

- **Je ne vois pas mes modifications.**
  → Hard refresh : `Cmd + Shift + R` (Mac) ou `Ctrl + Shift + R` (Windows). Le cache du navigateur peut garder l'ancienne version 24-48h.

- **Je veux annuler une publication.**
  → Dans Pages CMS, ouvrir l'article, décocher **Publié**, cliquer Save. L'article disparaît du site.

---

## Pour aller plus loin

- Documentation Pages CMS : https://pagescms.org/docs
- Documentation Markdown : https://www.markdownguide.org/cheat-sheet/
- Compresseur d'images : https://squoosh.app
- Vérifier le SEO d'un article : copier l'URL dans https://www.seoptimer.com/

---

## Architecture technique (pour la maintenance)

- Articles : fichiers Markdown dans `/_posts/` au format `YYYY-MM-DD-slug.md`.
- Images : `/images/blog/`.
- Configuration Pages CMS : `/.pages.yml` (ne pas modifier sans raison).
- Layout des articles : `/_layouts/post.html`.
- Page liste : `/blog/index.html` (utilise `/_layouts/blog.html`).
- Image de cover par défaut : `/images/blog/default-cover.jpg`.
