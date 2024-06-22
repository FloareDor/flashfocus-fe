// vite.config.ts
import react from "file:///C:/UFL/wafflehacks/waffle/vite-web-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "file:///C:/UFL/wafflehacks/waffle/vite-web-extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///C:/UFL/wafflehacks/waffle/vite-web-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  version: "1.0.0",
  manifest_version: 3,
  name: "FlashFocus",
  description: "Helping you curb exam anxiety.",
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "public/icon-32.png"
    }
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "public/icon-128.png"
  },
  permissions: [
    "activeTab",
    "identity",
    "storage"
  ],
  content_scripts: [
    {
      matches: [
        "http://*/*",
        "https://*/*",
        "<all_urls>",
        "*://www.instagram.com/*"
      ],
      js: [
        "src/pages/content/index.tsx",
        "src/pages/content/flashcard.tsx"
      ],
      css: [
        "public/contentStyle.css"
      ]
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  web_accessible_resources: [
    {
      resources: [
        "public/contentStyle.css",
        "public/icon-128.png",
        "public/icon-32.png",
        "src/pages/onboard/index.html"
      ],
      matches: []
    }
  ],
  oauth2: {
    client_id: "998161735702-vqbm0llqvp9vo6lo3kc9cucmg8kdmj84.apps.googleusercontent.com",
    scopes: ["openid", "email", "profile"]
  }
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "public/contentStyle.css",
        "public/dev-icon-128.png",
        "public/dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.2.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/FloareDor/waffle-hacks-fe"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    "@react-spring/three": "^9.7.3",
    "@react-three/drei": "^9.107.0",
    "@react-three/fiber": "^8.16.8",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "webextension-polyfill": "^0.11.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@types/chrome": "^0.0.268",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    tailwindcss: "^3.4.3",
    "ts-node": "^10.9.2",
    typescript: "^5.4.5",
    vite: "^5.2.11"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "C:\\UFL\\wafflehacks\\waffle\\vite-web-extension";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(apply) {
  if (apply)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(resolve(outDir2, "public/dev-icon-32.png"), () => console.log(`Deleted dev-icon-32.png frm prod build`));
      fs.rm(resolve(outDir2, "public/dev-icon-128.png"), () => console.log(`Deleted dev-icon-128.png frm prod build`));
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: true
      }
    }),
    stripDevIcons(isDev)
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVRkxcXFxcd2FmZmxlaGFja3NcXFxcd2FmZmxlXFxcXHZpdGUtd2ViLWV4dGVuc2lvblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVUZMXFxcXHdhZmZsZWhhY2tzXFxcXHdhZmZsZVxcXFx2aXRlLXdlYi1leHRlbnNpb25cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VGTC93YWZmbGVoYWNrcy93YWZmbGUvdml0ZS13ZWItZXh0ZW5zaW9uL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHsgY3J4LCBNYW5pZmVzdFYzRXhwb3J0IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcclxuXHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xyXG5pbXBvcnQgZGV2TWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5kZXYuanNvbic7XHJcbmltcG9ydCBwa2cgZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xyXG5cclxuY29uc3Qgcm9vdCA9IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyk7XHJcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCAncGFnZXMnKTtcclxuY29uc3QgYXNzZXRzRGlyID0gcmVzb2x2ZShyb290LCAnYXNzZXRzJyk7XHJcbmNvbnN0IG91dERpciA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdCcpO1xyXG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xyXG5cclxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5fX0RFVl9fID09PSAndHJ1ZSc7XHJcblxyXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcclxuICAuLi5tYW5pZmVzdCxcclxuICAuLi4oaXNEZXYgPyBkZXZNYW5pZmVzdCA6IHt9IGFzIE1hbmlmZXN0VjNFeHBvcnQpLFxyXG4gIG5hbWU6IGlzRGV2ID8gYERFVjogJHsgbWFuaWZlc3QubmFtZSB9YCA6IG1hbmlmZXN0Lm5hbWUsXHJcbiAgdmVyc2lvbjogcGtnLnZlcnNpb24sXHJcbn07XHJcblxyXG4vLyBwbHVnaW4gdG8gcmVtb3ZlIGRldiBpY29ucyBmcm9tIHByb2QgYnVpbGRcclxuZnVuY3Rpb24gc3RyaXBEZXZJY29ucyAoYXBwbHk6IGJvb2xlYW4pIHtcclxuICBpZiAoYXBwbHkpIHJldHVybiBudWxsXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnc3RyaXAtZGV2LWljb25zJyxcclxuICAgIHJlc29sdmVJZCAoc291cmNlOiBzdHJpbmcpIHtcclxuICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gJ3ZpcnR1YWwtbW9kdWxlJyA/IHNvdXJjZSA6IG51bGxcclxuICAgIH0sXHJcbiAgICByZW5kZXJTdGFydCAob3V0cHV0T3B0aW9uczogYW55LCBpbnB1dE9wdGlvbnM6IGFueSkge1xyXG4gICAgICBjb25zdCBvdXREaXIgPSBvdXRwdXRPcHRpb25zLmRpclxyXG4gICAgICBmcy5ybShyZXNvbHZlKG91dERpciwgJ3B1YmxpYy9kZXYtaWNvbi0zMi5wbmcnKSwgKCkgPT4gY29uc29sZS5sb2coYERlbGV0ZWQgZGV2LWljb24tMzIucG5nIGZybSBwcm9kIGJ1aWxkYCkpXHJcbiAgICAgIGZzLnJtKHJlc29sdmUob3V0RGlyLCAncHVibGljL2Rldi1pY29uLTEyOC5wbmcnKSwgKCkgPT4gY29uc29sZS5sb2coYERlbGV0ZWQgZGV2LWljb24tMTI4LnBuZyBmcm0gcHJvZCBidWlsZGApKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQHNyYyc6IHJvb3QsXHJcbiAgICAgICdAYXNzZXRzJzogYXNzZXRzRGlyLFxyXG4gICAgICAnQHBhZ2VzJzogcGFnZXNEaXIsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGNyeCh7XHJcbiAgICAgIG1hbmlmZXN0OiBleHRlbnNpb25NYW5pZmVzdCBhcyBNYW5pZmVzdFYzRXhwb3J0LFxyXG4gICAgICBjb250ZW50U2NyaXB0czoge1xyXG4gICAgICAgIGluamVjdENzczogdHJ1ZSxcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICBzdHJpcERldkljb25zKGlzRGV2KVxyXG4gIF0sXHJcbiAgcHVibGljRGlyLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXIsXHJcbiAgICBzb3VyY2VtYXA6IGlzRGV2LFxyXG4gICAgZW1wdHlPdXREaXI6ICFpc0RldlxyXG4gIH0sXHJcbn0pO1xyXG4iLCAie1xyXG4gIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXHJcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXHJcbiAgXCJuYW1lXCI6IFwiRmxhc2hGb2N1c1wiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJIZWxwaW5nIHlvdSBjdXJiIGV4YW0gYW54aWV0eS5cIixcclxuICBcIm9wdGlvbnNfdWlcIjoge1xyXG4gICAgXCJwYWdlXCI6IFwic3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbFwiXHJcbiAgfSxcclxuICBcImJhY2tncm91bmRcIjoge1xyXG4gICAgXCJzZXJ2aWNlX3dvcmtlclwiOiBcInNyYy9wYWdlcy9iYWNrZ3JvdW5kL2luZGV4LnRzXCIsXHJcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxyXG4gIH0sXHJcbiAgXCJhY3Rpb25cIjoge1xyXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcclxuICAgIFwiZGVmYXVsdF9pY29uXCI6IHtcclxuICAgICAgXCIzMlwiOiBcInB1YmxpYy9pY29uLTMyLnBuZ1wiXHJcbiAgICB9XHJcbiAgfSxcclxuICBcImNocm9tZV91cmxfb3ZlcnJpZGVzXCI6IHtcclxuICAgIFwibmV3dGFiXCI6IFwic3JjL3BhZ2VzL25ld3RhYi9pbmRleC5odG1sXCJcclxuICB9LFxyXG4gIFwiaWNvbnNcIjoge1xyXG4gICAgXCIxMjhcIjogXCJwdWJsaWMvaWNvbi0xMjgucG5nXCJcclxuICB9LFxyXG4gIFwicGVybWlzc2lvbnNcIjogW1xyXG4gICAgXCJhY3RpdmVUYWJcIixcclxuICAgIFwiaWRlbnRpdHlcIixcclxuICAgIFwic3RvcmFnZVwiXHJcbiAgXSxcclxuICBcImNvbnRlbnRfc2NyaXB0c1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwibWF0Y2hlc1wiOiBbXHJcbiAgICAgICAgXCJodHRwOi8vKi8qXCIsXHJcbiAgICAgICAgXCJodHRwczovLyovKlwiLFxyXG4gICAgICAgIFwiPGFsbF91cmxzPlwiLFxyXG4gICAgICAgIFwiKjovL3d3dy5pbnN0YWdyYW0uY29tLypcIlxyXG4gICAgICBdLFxyXG4gICAgICBcImpzXCI6IFtcclxuICAgICAgICBcInNyYy9wYWdlcy9jb250ZW50L2luZGV4LnRzeFwiLFxyXG4gICAgICAgIFwic3JjL3BhZ2VzL2NvbnRlbnQvZmxhc2hjYXJkLnRzeFwiXHJcbiAgICAgIF0sXHJcbiAgICAgIFwiY3NzXCI6IFtcclxuICAgICAgICBcInB1YmxpYy9jb250ZW50U3R5bGUuY3NzXCJcclxuICAgICAgXVxyXG4gICAgfVxyXG4gIF0sXHJcbiAgXCJkZXZ0b29sc19wYWdlXCI6IFwic3JjL3BhZ2VzL2RldnRvb2xzL2luZGV4Lmh0bWxcIixcclxuICBcIndlYl9hY2Nlc3NpYmxlX3Jlc291cmNlc1wiOiBbXHJcbiAgICB7XHJcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcclxuICAgICAgICBcInB1YmxpYy9jb250ZW50U3R5bGUuY3NzXCIsXHJcbiAgICAgICAgXCJwdWJsaWMvaWNvbi0xMjgucG5nXCIsXHJcbiAgICAgICAgXCJwdWJsaWMvaWNvbi0zMi5wbmdcIixcclxuICAgICAgICBcInNyYy9wYWdlcy9vbmJvYXJkL2luZGV4Lmh0bWxcIlxyXG4gICAgICBdLFxyXG4gICAgICBcIm1hdGNoZXNcIjogW11cclxuICAgIH1cclxuICBdLFxyXG5cdFwib2F1dGgyXCI6IHtcclxuXHRcdFwiY2xpZW50X2lkXCI6IFwiOTk4MTYxNzM1NzAyLXZxYm0wbGxxdnA5dm82bG8za2M5Y3VjbWc4a2Rtajg0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCIsXHJcblx0XHRcInNjb3Blc1wiOltcIm9wZW5pZFwiLCBcImVtYWlsXCIsIFwicHJvZmlsZVwiXVxyXG5cdH1cclxufVxyXG4iLCAie1xyXG4gIFwiYWN0aW9uXCI6IHtcclxuICAgIFwiZGVmYXVsdF9pY29uXCI6IFwicHVibGljL2Rldi1pY29uLTMyLnBuZ1wiLFxyXG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIlxyXG4gIH0sXHJcbiAgXCJpY29uc1wiOiB7XHJcbiAgICBcIjEyOFwiOiBcInB1YmxpYy9kZXYtaWNvbi0xMjgucG5nXCJcclxuICB9LFxyXG4gIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJyZXNvdXJjZXNcIjogW1xyXG4gICAgICAgIFwicHVibGljL2NvbnRlbnRTdHlsZS5jc3NcIixcclxuICAgICAgICBcInB1YmxpYy9kZXYtaWNvbi0xMjgucG5nXCIsXHJcbiAgICAgICAgXCJwdWJsaWMvZGV2LWljb24tMzIucG5nXCJcclxuICAgICAgXSxcclxuICAgICAgXCJtYXRjaGVzXCI6IFtdXHJcbiAgICB9XHJcbiAgXVxyXG59XHJcbiIsICJ7XHJcbiAgXCJuYW1lXCI6IFwidml0ZS13ZWItZXh0ZW5zaW9uXCIsXHJcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4yLjBcIixcclxuICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzaW1wbGUgY2hyb21lIGV4dGVuc2lvbiB0ZW1wbGF0ZSB3aXRoIFZpdGUsIFJlYWN0LCBUeXBlU2NyaXB0IGFuZCBUYWlsd2luZCBDU1MuXCIsXHJcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXHJcbiAgXCJyZXBvc2l0b3J5XCI6IHtcclxuICAgIFwidHlwZVwiOiBcImdpdFwiLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSm9obkJyYS93ZWItZXh0ZW5zaW9uLmdpdFwiXHJcbiAgfSxcclxuICBcInNjcmlwdHNcIjoge1xyXG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcclxuICAgIFwiZGV2XCI6IFwibm9kZW1vblwiXHJcbiAgfSxcclxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcclxuICBcImRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkByZWFjdC1zcHJpbmcvdGhyZWVcIjogXCJeOS43LjNcIixcclxuICAgIFwiQHJlYWN0LXRocmVlL2RyZWlcIjogXCJeOS4xMDcuMFwiLFxyXG4gICAgXCJAcmVhY3QtdGhyZWUvZmliZXJcIjogXCJeOC4xNi44XCIsXHJcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxyXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMy4xXCIsXHJcbiAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjExLjBcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4yM1wiLFxyXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNjhcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTIuMTFcIixcclxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjMuMVwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjMuMFwiLFxyXG4gICAgXCJAdHlwZXMvd2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTAuN1wiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjguMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuOC4wXCIsXHJcbiAgICBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI6IFwiXjQuMi4xXCIsXHJcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU3LjBcIixcclxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI5LjFcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1qc3gtYTExeVwiOiBcIl42LjguMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0XCI6IFwiXjcuMzQuMVwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4yXCIsXHJcbiAgICBcImZzLWV4dHJhXCI6IFwiXjExLjIuMFwiLFxyXG4gICAgXCJub2RlbW9uXCI6IFwiXjMuMS4wXCIsXHJcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjM4XCIsXHJcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4zXCIsXHJcbiAgICBcInRzLW5vZGVcIjogXCJeMTAuOS4yXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjVcIixcclxuICAgIFwi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QUE2QjtBQUFBLElBQzdCLFlBQVk7QUFBQSxJQUNaLFNBQVc7QUFBQSxJQUNYLFNBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxJQUNmLFdBQVc7QUFBQSxJQUNYLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxFQUNWO0FBQ0Y7OztBSC9DQSxJQUFNLG1DQUFtQztBQVV6QyxJQUFNLE9BQU8sUUFBUSxrQ0FBVyxLQUFLO0FBQ3JDLElBQU0sV0FBVyxRQUFRLE1BQU0sT0FBTztBQUN0QyxJQUFNLFlBQVksUUFBUSxNQUFNLFFBQVE7QUFDeEMsSUFBTSxTQUFTLFFBQVEsa0NBQVcsTUFBTTtBQUN4QyxJQUFNLFlBQVksUUFBUSxrQ0FBVyxRQUFRO0FBRTdDLElBQU0sUUFBUSxRQUFRLElBQUksWUFBWTtBQUV0QyxJQUFNLG9CQUFvQjtBQUFBLEVBQ3hCLEdBQUc7QUFBQSxFQUNILEdBQUksUUFBUSx1QkFBYyxDQUFDO0FBQUEsRUFDM0IsTUFBTSxRQUFRLFFBQVMsaUJBQVMsSUFBSyxLQUFLLGlCQUFTO0FBQUEsRUFDbkQsU0FBUyxnQkFBSTtBQUNmO0FBR0EsU0FBUyxjQUFlLE9BQWdCO0FBQ3RDLE1BQUk7QUFBTyxXQUFPO0FBRWxCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFVBQVcsUUFBZ0I7QUFDekIsYUFBTyxXQUFXLG1CQUFtQixTQUFTO0FBQUEsSUFDaEQ7QUFBQSxJQUNBLFlBQWEsZUFBb0IsY0FBbUI7QUFDbEQsWUFBTUEsVUFBUyxjQUFjO0FBQzdCLFNBQUcsR0FBRyxRQUFRQSxTQUFRLHdCQUF3QixHQUFHLE1BQU0sUUFBUSxJQUFJLHdDQUF3QyxDQUFDO0FBQzVHLFNBQUcsR0FBRyxRQUFRQSxTQUFRLHlCQUF5QixHQUFHLE1BQU0sUUFBUSxJQUFJLHlDQUF5QyxDQUFDO0FBQUEsSUFDaEg7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLElBQUk7QUFBQSxNQUNGLFVBQVU7QUFBQSxNQUNWLGdCQUFnQjtBQUFBLFFBQ2QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGNBQWMsS0FBSztBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLGFBQWEsQ0FBQztBQUFBLEVBQ2hCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsib3V0RGlyIl0KfQo=
