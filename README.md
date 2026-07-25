# Lino Mota | Portfolio

Portfólio pessoal estático, bilíngue (PT/EN), com hero 3D construído em React Three Fiber representando uma rede de sistemas distribuídos.

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- [Framer Motion](https://www.framer.com/motion/)

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy no GitHub Pages

O workflow em [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builda e publica o site automaticamente a cada push na branch `master`, via GitHub Actions + GitHub Pages.

Passos únicos no GitHub, antes do primeiro deploy:

1. Repositório: `LinoMota/LinoMota.github.io`, branch `master`.
2. Em **Settings → Pages**, em "Build and deployment", selecione **Source: GitHub Actions**.
3. Pronto: todo push em `master` dispara o build e publica o site.

## Conteúdo

Os textos (PT/EN) ficam centralizados em [src/data/content.ts](src/data/content.ts), extraídos dos currículos em [cvs/](cvs/). Para atualizar experiências, skills ou formação, edite esse arquivo; todos os componentes consomem os dados por lá.
