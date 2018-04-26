// https://www.json-generator.com/
[
    '{{repeat(100)}}',
    {
        _id: '{{objectId()}}',
        picture: 'http://ng5.dkjha.com/assets/img/image_placeholder.png',
        age: '{{integer(20, 40)}}',
        firstName: '{{firstName()}}',
        lastName: '{{surname()}}',
        gender: '{{gender()}}',
        email: '{{email()}}',
        phone: '+91 {{phone()}}',
        address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
        about: '{{lorem(1, "paragraphs")}}',
        latitude: '{{floating(-90.000001, 90)}}',
        longitude: '{{floating(-180.000001, 180)}}',
        friends: [
            '{{repeat(5,10)}}',
            {
                id: '{{objectId()}}',
                name: '{{firstName()}} {{surname()}}'
            }
        ]
    }
]