(async function Main() {
	const fs = require('fs');
	const db = await fs.promises.readFile(
		'/home/christian/Dokumente/P/Projekte/verwaltungs-software/app/data/db.json',
		'utf-8'
	);

	const { items } = JSON.parse(db);
	const array = reformatItems(items);

	fs.promises
		.writeFile(
			'/home/christian/Dokumente/P/Projekte/verwaltungs-software/app/data/db_2.json',
			JSON.stringify({ items: array }, null, 2)
		)
		.catch(console.error);

	fs.promises
		.writeFile(
			'/home/christian/Dokumente/P/Projekte/verwaltungs-software/app/data/images.json',
			JSON.stringify(imageDb, null, 2)
		)
		.catch(console.error);
})();

function reformatItems(items) {
	const { v4: uuid } = require('uuid');
	const array = items.map((i) => {
		const imageRef = imageReference(i.image);

		const obj = {
			_createdAt: new Date(i.created || '').toISOString(),
			_id: uuid(),
			_type: `item.${i.type || 'undefined'}`,
			_updatedAt: new Date(i.created || '').toISOString(),
			description: i.description,
			mainImage: {
				_type: 'base64',
				asset: {
					_ref: imageRef,
					_type: 'reference',
				},
			},
			owner: {
				_type: 'owner',
				current: 'christian',
			},
			rating: {
				comfort: Number(i.valuationConvenience),
				look: Number(i.valuationAppearance),
			},
			tags: i.tags,
			title: `title of ${i.type}`,
		};

		return obj;
	});

	return array;
}

const imageDb = {
	images: [],
};

function imageReference(image) {
	if (!image) return '';

	const { v4: uuid } = require('uuid');
	const imageId = uuid();
	const imageRef = `image-${imageId}-base64`;

	imageDb.images.push({
		_id: imageId,
		_ref: imageRef,
		base64: image,
	});

	return imageRef;
}
