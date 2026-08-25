# IgniteSol Assignment

A React Native mobile app for browsing Project Gutenberg books through the hosted [Gutendex](https://gutendex.careers.ignitesol.com) API. Users pick a genre, infinitely scroll matching books (covers only), search by title or author, and open the best available HTML, PDF, or TXT version in the system browser.

**Repository:** https://github.com/shubhamp4578/GutenbergProject

## Setup and run

### Prerequisites

- Node.js 22.11 or newer
- JDK 17
- Android Studio with Android SDK, NDK `27.1.12297006`, CMake, and an emulator or device

```sh
npm install
npm start
```

In a second terminal:

```sh
npm run android
```

On Windows, if the username contains a space, keep the existing CMake linker flag in `android/app/build.gradle`. Native libraries such as `react-native-screens` can fail to link (`CLANG_~1.EXE`); this project uses a small JS navigator to avoid that toolchain bug.

### Release APK

```sh
cd android
./gradlew assembleRelease
```

APK output: `android/app/build/outputs/apk/release/app-release.apk`

## Architecture overview

```
src/
  api/           Gutendex HTTP client and types
  components/    Genre, book, search, and empty/error UI
  config/        API base URL and query defaults
  constants/     Genre catalog
  hooks/         Debounced fetch + pagination
  i18n/          English strings (swap `en.ts` to add a locale)
  navigation/    Home ↔ Books stack
  screens/       Home and Books screens
  theme/         Colors and Montserrat typography
  utils/         Viewable format selection (skip `.zip`)
```

- Theme tokens live in `src/theme` so a second palette can be introduced without touching screens.
- Copy lives in `src/i18n/en.ts`. Export a different dictionary from `src/i18n/index.ts` to add a language.
- Books are requested with `mime_type=image` so results include covers, `topic` for the selected genre (subjects and bookshelves), and `search` for title/author.
- Pagination follows the API `next` URL. Search is debounced and re-queries from page one while keeping the genre filter.
- Tapping a book opens HTML, then PDF, then TXT. Zip URLs are treated as non-viewable.

## Third-party libraries

| Library | Why |
| --- | --- |
| `react-native-safe-area-context` | Safe area insets on notched devices |
| Montserrat (bundled TTF) | Spec typography |

React Navigation native-stack was not used because `react-native-screens` failed to compile on this Windows NDK path.

## AI tools used

Cursor (Grok) helped scaffold screens, the API client, launcher icons, and Git commits. Code was validated with TypeScript (`tsc`), Android Gradle installs/releases, emulator runs, and format-selection unit tests.

## Assumptions and known limitations

- Genre topics are the design labels (`fiction`, `drama`, and so on) sent as Gutendex `topic` values.
- Cover images use `image/jpeg` (or another `image/*` format) from the book `formats` map.
- Gutendex `next` / `previous` links sometimes point at an internal host (`gutendex-api:…`). The client rewrites those to `https://gutendex.careers.ignitesol.com` before fetching the next page.
- Release APK is signed with the Android debug keystore for assessment delivery (not a Play Store production key).
- iOS is configured for landscape and portrait but was primarily verified on Android emulator.

## Demo video

Please add Drive / YouTube / unlisted links after recording (portrait and landscape):

- Portrait: _paste URL here_
- Landscape: _paste URL here_

Suggested recording flow (2–3 minutes total):

1. Home: show genres, rotate to landscape, back to portrait
2. Open Fiction → scroll (pagination) → search e.g. `Dickens` → clear search
3. Tap a book → browser opens HTML/PDF/TXT
4. Airplane mode or bad network briefly → show error + Retry (optional)
