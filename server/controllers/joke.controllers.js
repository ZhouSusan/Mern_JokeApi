const Joke = require("../models/joke.model");
module.exports.findAllJokes = (req, res) => {
    Joke.find()
        .then(allDaJokes => {
            console.log(allDaJokes);
        return res.json({ jokes: allDaJokes})
        })
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}


module.exports.findOneSingleJoke = (req, res) => {
    console.log(req.params);
    Joke.findOne({ _id: req.params.id })
        .then(oneSingleJoke => res.json({ joke: oneSingleJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNewJoke = (req, res) => {
    console.log(req.body);
    Joke.create(req.body)
        .then(newlyCreatedJoke => res.json({ joke: newlyCreatedJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.updateExistingJoke = (req, res) => {
    Joke.findOneAndUpdate({ _id: req.params.id }, 
        req.body, 
        { new: true, runValidators: true }
        )
        .then(updatedJoke => res.json({ joke: updatedJoke }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteAnExistingJoke = (req, res) => {
    Joke.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.getRandomJoke = (req, res) => {
    Joke.count().exec((err,count) => {
        let rand = Math.floor(Math.random()*count);
        Joke.findOne().skip(rand).exec((err,result) => {
            if (err) {
                return res.json({message: 'Something went wrong', error: err});
            } else {
                return res.json({result: result});
            }
        })
    })
}