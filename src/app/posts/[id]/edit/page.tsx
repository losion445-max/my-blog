"use client"

import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
export default  function Edit(
	{ params }: { params: { id: string } }
) {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [published, setPublished] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false); 

	useEffect(() => {
		if (!isLoaded) 
			getPost({params}).then(post => {
				setTitle(post.title);
				setContent(post.content);
				setPublished(post.published);
				setIsLoaded(true);
			}).catch(err => console.error("Error: ", err))
	});

		const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	
		const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${params.id}`, {
		method: 'PUT',
		headers: {"Content-Type": 'application/json'},
		body: JSON.stringify({title, content, published}),
		});

		if (response.ok) {
			alert("Пост обновлён!");
		} else {
			alert("Ошибка ты долбоеб");
		}
	};

	return (
	  <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '600px' }}>
      <h1>Создать пост</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержание"
        required
        rows={6}
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />
	  <label>

	<label>
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
		  />
        Показывать?
    </label>
	</label>
      <button type="submit" style={{ padding: '10px 20px' }}>
        Изменить
      </button>
    </form>
	);
}


async function getPost({params}: {params: {id: string}}) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${id}`, {
	cache: 'no-store',});
	return await response.json() as Promise<Post>;
}