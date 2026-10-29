# gods-eye-view: kontrolowane zasoby podczas dużej baterii testów

Branch: `wersja-inzynierska-2026`. Stan bazowy: `main` / `a65d9d85f1faa06ae7df235d7fa8a29b026b7a5b`. Data wykonania: 29.10.2026.

To autorski wariant rozwojowy konkretnego fragmentu projektu. Branch zachowuje pełne drzewo kodu z wersji bazowej i zawiera opisane poniżej zmiany. [Wcześniejszy audyt](https://github.com/MichalGarnuch/gods-eye-view/tree/audyt-edukacyjny-2026) jest na osobnym branchu. Nie wykonywano merge ani wdrożenia.

## Problem zasobów

Duża liczba procesów testowych może zużyć pamięć współdzielonego runnera, nawet gdy poszczególne testy są poprawne. Domyślna równoległość zależna od liczby widocznych CPU bywa nieadekwatna do limitu RAM kontenera.

W `scripts/run-unit-tests.mjs` dodałem `unitTestConcurrency`. Domyślnie wybiera minimum z 4 i `availableParallelism()`, co uwzględnia dostępność procesorów środowiska. `GEV_TEST_CONCURRENCY` pozwala jawnie ustawić 1–32. Zero, ułamek, pusty ciąg i wartości ponad limit są błędem przed tworzeniem procesów.

## Zachowany podział testów

Zwykłe testy nadal wykonują się równolegle, ale z jawnym `--test-concurrency`. Istniejące sondy alokacji pozostają uruchamiane oddzielnie, szeregowo i z `--expose-gc`. Ich budżety były kalibrowane na Node 24; nie porównuję ich bezpośrednio z innym alokatorem ani wersją runtime.

Przepustowość może spaść na dużym runnerze. To koszt stabilności domyślnej konfiguracji. Operator mocniejszego hosta może zwiększyć parametr po pomiarze pamięci i czasu. Sztywny limit 32 chroni przed przypadkowym uruchomieniem setek workerów przez literówkę, nie jest twierdzeniem o optymalnej wartości dla każdego komputera.

## Weryfikacja

Nowy test sprawdza dobór domyślny dla jednego i wielu CPU, poprawny override i błędne wartości. Następnie wykonałem cały `npm test`: 4138 testów zwykłych (4137 zaliczonych, 1 pominięty) oraz 14 sprawdzeń w odrębnych procesach alokacji. Łącznie 4151 zaliczonych i 1 pominięty. Kontrola kierunków importu/granic pakietów oraz build również przeszły.

## Dalszy rozwój

Zbierałbym p95 zużycia RAM i czas poszczególnych plików testów. Kolejna optymalizacja to podział pracy między joby według czasu, a nie zwiększanie liczby procesów bez limitu. Budżety alokacji powinny mieć zapisany runtime i sprzęt odniesienia; zmiana domyślnego fan-out nie zmienia merytorycznej zawartości sond.

Ta wersja poprawia infrastrukturę testów. Nie zmienia źródeł danych mapy, kluczy zewnętrznych usług ani logiki śledzenia obiektów.

## Weryfikacja wykonana w tej sesji

| Sprawdzenie | Wynik i znaczenie |
|---|---|
| npm test na Node 24.22.1 | PASS: 4151 zaliczonych, 1 pominięty; sondy alokacji wykonane |
| npm run check:boundaries | PASS |
| npm run build | PASS; ostrzeżenia rozmiarów pakietów |

### Granice weryfikacji

Nie wykonano interaktywnych QA mapy ani testów z żywymi zewnętrznymi feedami. Pojedynczy pominięty test istnieje w zwykłej baterii; nie oznacza pominięcia obu sond alokacji.

## Mapa zmian

- [`src/unitTestConcurrency.test.mjs`](src/unitTestConcurrency.test.mjs)
- [`scripts/run-unit-tests.mjs`](scripts/run-unit-tests.mjs)
