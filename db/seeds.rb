# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demoUser = User.create(email: "demo-user@demo.com", 
password: "password",
display_name:"Demo User");
demoFriend = User.create(email: "demo-friend@demo.com", password: "password", display_name:"Friend of Demo");
testChannel = Channel.create(name: "Test channel", topic: "testing", private: false, admin_id: 1);
message1 = Message.create!(body: "pepitas are nothing special",
    user_id: 1,
    messageable_id: testChannel.id,
    messageable_type: Channel);
message2 = Message.create(body: "Raspberry seeds are worse",
    user_id: 2,
    messageable_id: testChannel.id,
    messageable_type: Channel);