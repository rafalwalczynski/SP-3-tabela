
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
const initialPracownicy = [
  { id: 1, imie: "Anna", nazwisko: "Kowalska", dzial: "IT", pensja: 7200 },
  { id: 2, imie: "Piotr", nazwisko: "Nowak", dzial: "Sprzedaż", pensja: 5400 },
  { id: 3, imie: "Maria", nazwisko: "Wiśniewska", dzial: "Księgowość", pensja: 6100 },
  { id: 4, imie: "Jan", nazwisko: "Kowalczyk", dzial: "IT", pensja: 8300 },
  { id: 5, imie: "Katarzyna", nazwisko: "Zielińska", dzial: "Sprzedaż", pensja: 5800 },
  { id: 6, imie: "Tomasz", nazwisko: "Szymański", dzial: "IT", pensja: 9100 },
  { id: 7, imie: "Agnieszka", nazwisko: "Woźniak", dział: "Księgowość", pensja: "6400"},
  { id: 8, imie: "Michal", nazwisko: "Kaczmarek", dział: "Sprzedaż", pensja: "5200"},
  { id: 9, imie: "Magdalena", nazwisko: "Mazur", dział: "IT", pensja: "7800"},
  { id: 10, imie: "Paweł", nazwisko: "Krawczyk", dział: "Ksiegowość", pensja: "6000"},
  {id: 11, imie: "Joanna", nazwisko: "Piotrowska", dział: "Sprzedaż", pensja: "5600"},
  {id: 12, imie: "Łukasz", nazwisko: "Grabowski", dział: "IT", pensja: "8700"}
];

function App() {
  const [pracownicy] = useState(initialPracownicy);
  const [szukajNazwisko, setSzukajNazwisko] = useState('');
  const [wybranyDzial, setWybranyDzial] = useState('');

  const handleNazwiskoChange = (e) => {
    const wartosc = e.target.value;
    setSzukajNazwisko(wartosc);
    obliczIFiltruj(wartosc, wybranyDzial);
  };

  const handleDzialChange = (e) => {
    const dzial = e.target.value;
    setWybranyDzial(dzial);
    obliczIFiltruj(szukajNazwisko, dzial);
  };

  const obliczIFiltruj = (fraza, dzial) => {
    const przefiltrowane = przefiltrujPracownikow(fraza, dzial);
    console.log(`Wyniki: ${przefiltrowane.length}`);
  };

  const przefiltrujPracownikow = (fraza, dzial) => {
    const znormalizowanaFraza = fraza.trim().toLowerCase();

    return pracownicy.filter((pracownik) => {
      const pasujeNazwisko = pracownik.nazwisko
        .toLowerCase()
        .includes(znormalizowanaFraza);

      const pasujeDzial = dzial === '' || pracownik.dzial === dzial;

      return pasujeNazwisko && pasujeDzial;
    });
  };

  const wyswietlaniPracownicy = przefiltrujPracownikow(szukajNazwisko, wybranyDzial);

  return (
    <div className="container mt-4">
      <h2>Pracownicy</h2>

 
      <div className="mb-3">
        <label htmlFor="szukaj" className="form-label">Szukaj:</label>
        <input 
          type="text" 
          className="form-control" 
          id="szukaj" 
          value={szukajNazwisko}
          onChange={handleNazwiskoChange}
        />
      </div>

  
      <div className="mb-3">
        <label htmlFor="dzial" className="form-label">Dział:</label>
        <select 
          className="form-select" 
          id="dzial"
          value={wybranyDzial}
          onChange={handleDzialChange}
        >
          <option value="">Wszystkie</option>
          <option value="IT">IT</option>
          <option value="Sprzedaż">Sprzedaż</option>
          <option value="Księgowość">Księgowość</option>
        </select>
      </div>

      <p className="fw-bold">Liczba pracowników: {wyswietlaniPracownicy.length}</p>

      {wyswietlaniPracownicy.length > 0 ? (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Dział</th>
              <th scope="col">Pensja</th>
            </tr>
          </thead>
          <tbody>
            {wyswietlaniPracownicy.map((p) => (
              <tr key={p.id}>
                <td>{p.imie}</td>
                <td>{p.nazwisko}</td>
                <td>{p.dzial}</td>
                <td>{p.pensja}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning" role="alert">
          Brak pracowników spełniających kryteria
        </div>
      )}
    </div>
  );
}

export default App;