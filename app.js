const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

const renderCafe = doc => {
	let li = document.createElement('li');
	let name = document.createElement('span');
	let city = document.createElement('span');
	let del = document.createElement('div');

	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	del.textContent = 'x';

	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(del);

	cafeList.appendChild(li);

	del.addEventListener('click', e => {
		e.stopPropagation();
		const id = e.target.parentElement.getAttribute('data-id');
		db.collection('cafes')
			.doc(id)
			.delete();
	});
};

db.collection('cafes')
	.orderBy('name')
	.get()
	.then(snapshot => {
		snapshot.docs.map(item => {
			renderCafe(item);
		});
	});
document.addEventListener('submit', e => {
	e.preventDefault();
	db.collection('cafes').add({
		name: form.name.value,
		city: form.city.value
	});
	form.name.value = '';
	form.city.value = '';
});
