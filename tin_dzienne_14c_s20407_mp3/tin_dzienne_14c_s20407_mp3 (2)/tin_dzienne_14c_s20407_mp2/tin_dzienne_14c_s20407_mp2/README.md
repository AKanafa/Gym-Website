# Adam Kanafa - tin_dzienne_14c_s20407_mp2

## 1. Instrukcja uruchomienia projektu

   - nalezy rozpakowac archiwum z kodem zrodlowym
   - trzeba przejsc do katalogu z kodem zrodlowym
   - trzeba uruchomic terminal w katalogu
   - w terminalu trzeba uruchomic docker za pomoca polecenia
   ```
   cd docker

   docker-compose up 
   ```
   - przejść do 2. instrukcji i kontynuować kolejne kroki po skonfigurowaniu i stworzeniu bazy danych
   - w terminalu trzeba uruchomic aplikacje za pomoca
   ```
   tylko jeśli nie ma folderu node_module:

   npm install
   ```
   ```
   npm start
   ```
   - aplikacja dostępna będzie w przegladarce pod url-em: http://localhost:3000

<br />

## 2. Instrukcja instalacji i konfiguraci bazy danych

   - po uruchomieniu dockera trzeba wejsc w przegladarce w phpmyadmina pod url-em: http://localhost:8183 
   
   - zalogowac sie  
   ```
   server = mysql

   user = root 
   
   password = root
   ```
   - wejść w zakladkę **sql** i wykonać takie zapytanie:
   ```sql
   CREATE SCHEMA IF NOT EXISTS Tin-dzienne-S20407-mp2;
   ```
   - baza jest gotowa do uzycia (brak tabel i rekordów)
