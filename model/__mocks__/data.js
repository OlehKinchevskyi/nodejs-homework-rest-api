const contacts = [
    {
        _id: '6082bdb48b01a010b8cf1fd4',
        name: 'Allen Raymond',
        email: 'nulla.ante@vestibul.co.uk',
        phone: '(992) 914-3792',
        favorite: true,
    },
    {
        _id: '6082bdb48b01a010b8cf1fd5',
        name: 'Chaim Lewis',
        email: 'dui.in@egetlacus.ca',
        phone: '(294) 840-6685',
        favorite: true,
    },
]

const newContact = {
    name: 'Test Test',
    email: 'test@test.com',
    phone: '(000) 000-0000',
    favorite: false,
}

const User = {
    subscription: 'pro',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOGM1YWY4NzMyNTRlMDk5MDkyNjZkNSIsImlhdCI6MTYyMDMyNzY0NSwiZXhwIjoxNjIwMzM0ODQ1fQ.o-9v0OCGBFqG6VsxEDWQgMzJd4miYcwH0qMA6b5JrtI',
    _id: '608c5af873254e09909266d5',
    id: '608c5af873254e09909266d5',
    email: 'test5555@example.com',
    password: '$2a$06$NpScR88jlK.cseFLq5hjS.XmNU4avl3bCVlguHy/ZF/zUyp45JiyS',
    createdAt: '2021-04-30T19:31:04.983+00:00',
    updatedAt: '2021-05-06T19:26:43.235+00:00',
    avatarURL: 'https://res.cloudinary.com/dv6czpoxs/image/upload/v1620329204/Avatars/...',
    idCloudAvatar: 'Avatars/nvkzniocp1uoxhdfva2c'
}

const users = []
users[0] = User

const newUser = { email: 'test123456@test.com', password: '12345678' }

module.exports = { contacts, newContact, User, users, newUser }