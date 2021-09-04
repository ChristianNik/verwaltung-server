const express = require('express');
const app = express();
const port = 3002;
const path = require('path');

// app.get('/', (req, res) => {
// 	res.send('Hello World!');
// });

app.use(
	express.static(
		'/home/christian/Dokumente/P/Projekte/verwaltungs-software/client/dist'
	)
);
// Client - React App
app.get('/*', (req, res) => {
	res.sendFile(
		path.join(
			'/home/christian/Dokumente/P/Projekte/verwaltungs-software/client/dist',
			'index.html'
		)
	);
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
