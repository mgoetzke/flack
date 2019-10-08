# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demoUser = User.create!(email: "demo-user@demo.com", 
password: "password",
display_name:"Demo User");
testChannel = Channel.create(name: "general", topic: "testing", private: false, admin_id: 1);
testChannel2 = Channel.create(name: "random", topic: "Second testing", private: false, admin_id: 1);
demoFriend = User.create(email: "demo-friend@demo.com", password: "password", display_name:"Friend of Demo");
message1 = Message.create!(body: "pepitas are nothing special",
    user_id: 1,
    messageable_id: testChannel.id,
    messageable_type: Channel);
message2 = Message.create(body: "Raspberry seeds stick to my teeth",
    user_id: 2,
    messageable_id: testChannel.id,
    messageable_type: Channel);
message3 = Message.create!(body: "2pepitas are nothing special",
    user_id: 1,
    messageable_id: testChannel2.id,
    messageable_type: Channel);
message4 = Message.create(body: "2Raspberry seeds stick to my teeth",
    user_id: 2,
    messageable_id: testChannel2.id,
    messageable_type: Channel);