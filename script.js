function censorMessage(message) {
    const inappropriateWords = ["tolol", "kontol", "anjing"]; // Add your list of words
    const censor = (word) => '*'.repeat(word.length);

    inappropriateWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        message = message.replace(regex, censor(word));
    });

    return message;
}

function sendMail(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const censoredMessage = censorMessage(message);

    const templateParams = {
        from_name: name,
        from_email: email,
        message: censoredMessage,
    };

    emailjs.send('service_jdlnnb8', 'template_cd50oxc', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Email sent successfully!');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Failed to send email. Please try again later.');
        });
}
