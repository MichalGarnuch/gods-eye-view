# gods-eye-view — przewodnik i audyt edukacyjny

**Stan przeglądu:** 29 października 2026 r.  
**Gałąź bazowa:** `main`  
**Analizowany commit:** `a65d9d85f1faa06ae7df235d7fa8a29b026b7a5b`  
**Mapa wszystkich plików śledzonych przez Git:** [1](AUDYT_MAPA_01.md) · [2](AUDYT_MAPA_02.md) · [3](AUDYT_MAPA_03.md) · [4](AUDYT_MAPA_04.md) · [5](AUDYT_MAPA_05.md)

> To jest przegląd reprezentatywnych części projektu z inwentaryzacją wszystkich śledzonych plików, a nie pełna, ręczna weryfikacja każdego wiersza ani certyfikat bezpieczeństwa. Mapa jest automatyczna; wymienienie pliku nie oznacza, że został przetestowany lub dokładnie przeczytany. Wyniki odnoszą się do powyższego commita. Inne gałęzie mogą zawierać inne wersje.

## Co robi projekt

Fork projektu wizualizującego glob i różne publiczne źródła danych w interfejsie 3D.

## Jak czytać kod i jak przepływają dane

[`src/`](src) zawiera warstwę widoku, dane i nakładki, [`server/`](server) integracje po stronie serwera, [`config/`](config) konfiguracje źródeł, a [`scripts/`](scripts) weryfikację i narzędzia. README opisuje źródła i sposób uruchamiania.

Podczas czytania zacznij od punktu wejścia, przejdź do funkcji odpowiadającej za żądanie lub działanie użytkownika, a potem do operacji na danych i wyniku. Mapa plików podaje ścieżki i automatycznie rozpoznane nazwy wybranych deklaracji.

## Co jest wartościowe w obecnym rozwiązaniu

Projekt ma rozbudowane testy jednostkowe, kontrolę granic pakietów oraz osobne testy budżetu alokacji.

## Ustalenia, luki i proponowany rozwój

- **Zakres:** to fork `bilawalsidhu/gods-eye-view`; przejrzano architekturę, workflow i konfigurację testów, nie wszystkie źródła danych ani każdą z setek nakładek.

- **Do rozwoju:** przy komercyjnym użyciu dla każdego źródła osobno potwierdzić licencję, limity, czas aktualizacji, koszty i zakres praw do wyświetlania. Testy jednostkowe nie potwierdzają bieżącej dostępności zewnętrznych feedów.

- **Eksploatacja:** działanie 3D, zużycie pamięci i zgodność przeglądarek warto sprawdzać na słabszych telefonach z rzeczywistymi źródłami.

## Sprawdzenia i ich granice

`npm run check:boundaries` i `npm test` przeszły: zasadniczy zestaw 4136 zaliczonych, 1 pominięty, a dodatkowe testy alokacji 1 i 13 zaliczone. Nie testowano rzeczywistych źródeł ani UI.

W kopii roboczej dostępne pliki Pythona sprawdzono dodatkowo parserem składni; sprawdzono też składnię odczytanych plików [`package.json`](package.json) i `composer.json`. Nie zastępuje to uruchomienia programu. Kod źródłowy tej gałęzi jest taki sam jak w commicie bazowym; dodane są wyłącznie dokumenty audytu i mapy.

## Jak zaplanować kolejne prace

Najpierw zajmij się punktami oznaczonymi jako krytyczne lub wysokie, następnie ustal, które uwagi wymagają testu na pełnym środowisku. Dla każdej zmiany przygotuj osobną gałąź, konkretny przypadek odtwarzający problem i test rezultatu. Nie traktuj propozycji jako potwierdzenia, że poprawka została już wdrożona.
