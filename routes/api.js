__path = process.cwd()
let express = require('express');
let db = require(__path + '/database/db');
try {
	let zahirr = db.get("zahirr");
} catch (e) {
	console.log('')
}
let note = "Follow my instagram _pa7rick"
let axios = require('axios')
let fs = require('fs')
let fetch = require('node-fetch');
let router = express.Router();
let hxz = require('hxz-api')
let xa = require('xfarr-api')
let yts = require('yt-search')
let nhentai = require('nhentai-js');
let NanaAPI = require('nana-api')
let nana = new NanaAPI()
let {
	tiktok,
	pinterest,
	mediafireDl,
	doujindesu,
	pinterestdl,
	igstalk,
} = require('../lib/index')
let options = require(__path + '/lib/options.js');
let {
	color,
	bgcolor
} = require(__path + '/lib/color.js');
let {
	getBuffer,
	fetchJson
} = require(__path + '/lib/fetcher.js');

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

loghandler = {
	noturl: {
		status: false,
		note: `${note}`,
		code: 406,
		message: 'Masukan URL'
	},
	notquery: {
		status: false,
		note: `${note}`,
		code: 406,
		message: 'Masukkan query'
	},
	error: {
		status: 404,
		note: `${note}`,
		message: 'Internal server error :( | Please report via WhatsApp wa.me/6288989029718'
	}
}

// Downloader
router.get('/tiktok', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let result = await tiktok(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/igdl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let result = await hxz.igdl(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/mediafire', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let result = await mediafireDl(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/youtube', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let result = await hxz.youtube(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/ytplay', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let ytsearch = await yts(query);
	let ytall = ytsearch.all
	let url = ytall[0].url
	let result = await hxz.youtube(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/ytplay2', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let ytsearch = await yts(query);
	let ytall = ytsearch.all
	let url = ytall[0].url
	let data = await xa.Youtube(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			title: data.title,
			duration: data.duration,
			source: data.url,
			video: { 
				url: data.medias[4].url,
			    quality: data.medias[4].quality,
			    extension: data.medias[5].extension, 
			    size: data.medias[5].size,
			    formattedSize: data.medias[5].formattedSize
			},
			audio: { 
				url: data.medias[7].url,
			    quality: data.medias[7].quality, 
			    extension: data.medias[7].extension, 
			    size: data.medias[7].size,
			    formattedSize: data.medias[7].formattedSize
			},
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/twitter', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let result = await hxz.twitter(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/pindl', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let result = await pinterestdl(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
router.get('/tiktok2', async (req, res) => {
	let url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	let data = await hx.ttdownloader(url)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			wm: data.wm,
			nowm: data.nowm,
			audio: data.audio
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
/** 
 *  Fun & Game | Total: 9
 *  Rest - API PatrickBot
 **/
router.get('/tebakgambar', async (req, res) => {
	let result = await hx.tebakgambar(query)
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/family100', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/family100.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/tebakkata', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/tebakkata.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/tebakkalimat', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/tebakkalimat.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/tebakbendera', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/tebakkata.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.img,
		jawaban: data.name
	})
})
router.get('/siapakahaku', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/siapakahaku.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/caklontong', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/caklontong.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/tebakkimia', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/tebakkimia.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
router.get('/tekateki', async (req, res) => {
	let soal = JSON.parse(fs.readFileSync(__path + '/lib/game/tekateki.json'));
	let data = soal[Math.floor(Math.random() * soal.length)];
	let result = {
		soal: data.soal,
		jawaban: data.jawaban
	}
	res.json({
		status: 200,
		note: `${note}`,
		soal: data.soal,
		jawaban: data.jawaban
	})
})
/** 
 *  Searching | Total: 3
 *  Rest - API PatrickBot
 **/
router.get('/pinterest', async (req, res) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let result = await pinterest(query)
	res.json({
		status: 200,
		note: `${note}`,
		result
	})
})
router.get('/google', async (req, res, next) => {
	let query = req.query.query
	if (!query) return res.json(loghandler.notquery)
	let google = require('google-it')
	let result = google({
		'query': query
	}).then(result => {
		res.json({
				status: 200,
				note: `${note}`,
				result
			})
			.catch(e => {
				res.json(loghandler.error)
			})
	})
})
router.get('/igstalk', async (req, res) => {
	let username = req.query.username
	if (!username) return res.json({ status: false, note: `${note}`, code: 406, message: 'Masukkan username!'})
	let result = await igstalk(username)
	try {
		res.json({
			status: 200,
			note: `${note}`,
			result
		})
	} catch (err) {
		console.log(err)
		res.json(loghandler.error)
	}
})
/** 
 *  Random Image | Total: 6
 *  Rest - API PatrickBot
 **/
router.get('/randomimage/waifu', async (req, res, next) => {
	fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
		.then(response => response.json())
		.then(async data => {
			let result = data;
			let buffer = await fetch(data.url)
			res.type('png')
			res.send(await buffer.buffer())
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/randomimage/neko', async (req, res, next) => {
	fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
		.then(response => response.json())
		.then(async data => {
			let result = data;
			let buffer = await fetch(data.url)
			res.type('png')
			res.send(await buffer.buffer())
		})
		.catch(e => {
			res.json(loghandler.error)
		})
})
router.get('/randomimage/husbu', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/husbu.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/randomimage/loli', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/loli.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/randomimage/milf', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/milf.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})
router.get('/randomimage/cosplay', async (req, res, next) => {
	let waif = (await axios.get(`https://raw.githubusercontent.com/Arya-was/endak-tau/main/cosplay.json`)).data
	let result = waif[Math.floor(Math.random() * (waif.length))]
	let data = await getBuffer(result)
	await fs.writeFileSync(__path + '/database/waifu.png', data)
	await res.sendFile(__path + '/database/waifu.png')
	await sleep(3000)
	await fs.unlinkSync(__path + '/database/waifu.png')
})

router.use(function(req, res) {
	res.status(404)
		.set("Content-Type", "text/html")
		.sendFile(__path + '/views/404.html');
});

module.exports = router