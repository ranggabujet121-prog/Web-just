# To-Do List Sederhana

Sebuah aplikasi catatan/to-do list sederhana menggunakan **HTML**, **CSS**, dan **JavaScript**. Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, mencari, dan menghapus catatan. Data catatan disimpan menggunakan **Local Storage** sehingga tetap tersimpan meskipun halaman direfresh.

---

## Fitur

- Menambahkan catatan baru
- Mengedit catatan yang sudah ada
- Menghapus catatan individual
- Menghapus semua catatan sekaligus
- Mencari catatan berdasarkan kata kunci
- Menyimpan catatan secara otomatis menggunakan Local Storage

---

## Tampilan

- Input untuk mencari catatan
- Input untuk menambahkan nama/catatan
- Tombol kirim untuk menambahkan catatan
- Tombol hapus semua catatan
- Daftar catatan yang dapat diedit atau dihapus satu per satu

---

## Cara Penggunaan

1. Buka file `index.html` di browser.
2. Ketik catatan di kolom **ketik nama mu disini**, lalu klik **kirim**.
3. Gunakan kolom **cari catatan** untuk menemukan catatan tertentu.
4. Klik **Edit** untuk mengubah catatan.
5. Klik **×** pada catatan untuk menghapus catatan tersebut.
6. Klik **hapus semua** untuk menghapus semua catatan sekaligus.

---

## kode
**HTML:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Polos</title>
    <!-- Memanggil file CSS eksternal -->
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
    <input type="text" id="cari" placeholder="cari catatan...." oninput="tampilkanKartu()">
    <input type="text" id="nama" placeholder="ketik nama mu disini">
    <button>&times;</button>
    <button onclick="buatKartu()">kirim</button>
    <button onclick="hapusSemua()">hapus semua</button>
    <div id="hasil"></div>
    <p id="jumlah">jumlah catatan: 0</p>
    <script src="js/script.js"></script>
</body>
</html>
```
---

**CSS:**
```css
body {
  align-content: center;
  align-items: center;
  text-align: center;
  font-family: fantasy;
  justify-content: space-between;
}
#cari {
  border-radius: 999px;
  border: 2px solid black;
  padding: 10px 20px;
  width: 200px;
  font-size: 12px
}
#nama {
  border: 2px solid #555;
  border-radius: 250px;
  padding: 10px 20px;
  width: 200px;
  font-size: 16px;
}
@keyframes muncul {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes hilang {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.5);
  }
}
.kartu {
  width: 200px;
  margin: 15px auto;
  padding: 10px 35px 10px 10px;
  background: #e0e0e0;
  border-radius: 8px;
  display: block;
  opacity: 1;
  font-size: 16px;
  justify-content: flex-start;
  animation: muncul 0.3s ease-out;
}
.kartu span {
  display: block;
}
.kartu.hilang {
  animation: hilang 0.3s ease-in forwards;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  background-color: gold;
  color: white;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
```
---

**JAVASCRIPT:**
```javascript
let daftar = [];

function buatKartu() {
    let teks = document.getElementById("nama").value;
    
    if (teks === "") {
        alert("tulisannya mana wok");
        return;
    }
    
    daftar.push(teks);
    simpanData();
    tampilkanKartu();
    
    document.getElementById("nama").value = "";
    
}
function tampilkanKartu() {
    let hasil = document.getElementById("hasil");
    hasil.innerHTML = "";
    
    let kataCari = 
    document.getElementById("cari").value.toLowerCase();
    
    document.getElementById("jumlah").innerText =
    "jumlah catatan: " + daftar.length;
    
    for(let i = 0; i <daftar.length; i++) {
        let index = i;
        
        if(!daftar[index].toLowerCase().includes(kataCari)) {
            continue;
        }
        
        let kartu = document.createElement("div");
        kartu.className = "kartu";
        
        let isi = document.createElement("span");
        isi.innerText = daftar[index];
        
        let hapus = document.createElement("button");
        hapus.innerHTML = "&times;";
        
        let edit = document.createElement("button");
        edit.innerText = "Edit";
        
        edit.onclick = function() {
            let baru = prompt("Edit catatan:", daftar[index]);
            if (baru === null || baru === "") {
                return;
            }
            daftar[index] = baru;
            simpanData();
            tampilkanKartu();
        };
        
        hapus.onclick = function() {
            kartu.classList.add("hilang");
            
            setTimeout(function() {
                daftar.splice(index, 1);
                simpanData();
                tampilkanKartu();
            }, 300);
        };
        kartu.appendChild(isi);
        kartu.appendChild(edit);
        kartu.appendChild(hapus);
        hasil.appendChild(kartu);
    }
}
function hapusSemua() {
    if (daftar.length === 0) {
        alert("tidak ada catatan");
        return;
    }
    
    if (confirm("yakin ingin hapus?")) {
        daftar = [];
        simpanData();
        tampilkanKartu();
    }
}
function simpanData() {
    localStorage.setItem("catatan", JSON.stringify(daftar));
}

let dataTersimpan = localStorage.getItem("catatan");

if (dataTersimpan) {
    daftar = JSON.parse(dataTersimpan);
    tampilkanKartu();
}
```

