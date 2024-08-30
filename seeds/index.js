//have to add data to cities and seedhelpers


const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');
mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function () {
    console.log("Database connected")
});
const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const price = Math.floor(Math.random() * 2000) + 2000;
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '64fdb942b395971b1abefa78',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Great place',
            price,
            geometry: {
                type: 'Point', coordinates: [cities[random1000].longitude,
                cities[random1000].latitude,]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png',
                    filename: 'YelpCamp/cefpfjlvlp5g7quocktg',
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png',
                    filename: 'YelpCamp/ipi2jv42owjx6fxqwxnj',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
