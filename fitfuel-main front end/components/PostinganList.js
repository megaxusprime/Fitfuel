import { useEffect, useState } from 'react';

function PostinganList() {
  const [postingan, setPostingan] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/postingan`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPostingan(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Daftar Postingan</h1>
      <ul>
        {postingan.map((post) => (
          <li key={post.id}>{post.konten}</li>
        ))}
      </ul>
    </div>
  );
}


export default function PostinganList() {
  return (
    <div>
      <h2>Daftar Postingan</h2>
      {/* Konten daftar postingan akan ditambahkan di sini */}
    </div>
  );
}

