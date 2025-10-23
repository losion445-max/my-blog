'use client';


export function DeleteButton({ postId }: { postId: number }) {

  const handleDelete = async () => {
    if (!confirm('Удалить пост?'))
		 return;
	const response = await fetch(`/api/posts/${postId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		alert('Пост удалён!');
	} else {
		alert('Ошибка удаления');
	}
 
  };

  return (
    <button
      onClick={handleDelete}
      style={{ color: 'red', marginTop: '20px' }}
    >
      Удалить пост
    </button>
  );
}