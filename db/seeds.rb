# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demoUser = User.create!(email: "demo-user@demo.com", password: "password",display_name:"Demo User");
demoFriend = User.create(email: "demo-friend@demo.com", password: "password", display_name:"Friend of Demo");
demoDiatribe = User.create(email: "demo-diatribe@demo.com", password: "password", display_name:"Diatribe Darren");
demoChatty = User.create(email: "demo-chatty@demo.com", password: "password", display_name:"Chatty Cathy");
demoConvo = User.create(email: "demo-convo@demo.com", password: "password", display_name:"Conversant Karl");
demoGabby = User.create(email: "demo-gabby@demo.com", password: "password", display_name:"Gabby");
demoTalkative = User.create(email: "demo-talkative@demo.com", password: "password", display_name:"Talkative Terry");
demoProfuse = User.create(email: "demo-profuse@demo.com", password: "password", display_name:"Profuse Patrick");
demoComms = User.create(email: "demo-comms@demo.com", password: "password", display_name:"Comms Kathleen");
demoFluent = User.create(email: "demo-fluent@demo.com", password: "password", display_name:"Fluent Fred");
generalChannel = Channel.create(name: "general", topic: "general discussion", private: false, admin_id: 1);
randomChannel = Channel.create(name: "random", topic: "random discussion", private: false, admin_id: 1);
Membership.create(user_id: demoUser.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoUser.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoFriend.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoFriend.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoDiatribe.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoDiatribe.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoChatty.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoChatty.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoConvo.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoConvo.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoGabby.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoGabby.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoTalkative.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoTalkative.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoProfuse.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoProfuse.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoComms.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoComms.id, memberable_id: randomChannel.id, memberable_type: Channel)
Membership.create(user_id: demoFluent.id, memberable_id: generalChannel.id, memberable_type: Channel)
Membership.create(user_id: demoFluent.id, memberable_id: randomChannel.id, memberable_type: Channel)
                        
message1 = Message.create!(body: "pepitas are nothing special",
    user_id: 1,
    messageable_id: generalChannel.id,
    messageable_type: Channel);
message2 = Message.create(body: "Raspberry seeds stick to my teeth",
    user_id: 2,
    messageable_id: generalChannel.id,
    messageable_type: Channel);
message3 = Message.create!(body: "2pepitas are nothing special",
    user_id: 1,
    messageable_id: randomChannel.id,
    messageable_type: Channel);
message4 = Message.create(body: "2Raspberry seeds stick to my teeth",
    user_id: 2,
    messageable_id: randomChannel.id,
    messageable_type: Channel);