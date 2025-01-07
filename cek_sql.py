import psycopg2

# Konfigurasi koneksi ke PostgreSQL
config = {
    'user': 'advent',
    'host': 'localhost',
    'database': 'my_database',
    'password': 'advent123',
    'port': 5432,                  # Port PostgreSQL (default: 5432)
}

def show_table_contents(table_name):
    """Fungsi untuk menampilkan isi tabel tertentu di database"""
    try:
        # Membuat koneksi ke database
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()

        # Query untuk mengambil data dari tabel
        query = f"SELECT * FROM {table_name};"
        cursor.execute(query)

        # Ambil semua data dari tabel
        rows = cursor.fetchall()

        # Tampilkan data
        if rows:
            print(f"Isi tabel '{table_name}':")
            for row in rows:
                print(row)
        else:
            print(f"Tabel '{table_name}' kosong.")

        # Tutup koneksi
        cursor.close()
        connection.close()

    except psycopg2.Error as e:
        print(f"Terjadi error: {e}")

def list_tables():
    """Fungsi untuk menampilkan daftar tabel di database"""
    try:
        # Membuat koneksi ke database
        connection = psycopg2.connect(**config)
        cursor = connection.cursor()

        # Query untuk mengambil daftar tabel
        query = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
        cursor.execute(query)

        # Ambil daftar tabel
        tables = cursor.fetchall()
        print("Daftar tabel di database:")
        for table in tables:
            print(f"- {table[0]}")

        # Tutup koneksi
        cursor.close()
        connection.close()

    except psycopg2.Error as e:
        print(f"Terjadi error: {e}")

# Main program
if __name__ == "__main__":
    print("=== Daftar Tabel ===")
    list_tables()

    # Tampilkan isi tabel
    table_name = input("\nMasukkan nama tabel yang ingin dilihat: ")
    show_table_contents(table_name)
