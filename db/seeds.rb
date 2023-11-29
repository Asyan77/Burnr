# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


ActiveRecord::Base.transaction do
    # Like.destroy_all
    # Album.destroy_all
    User.destroy_all
    # Photo.destroy_all
    # Comment.destroy_all

    # ActiveRecord::Base.connection.reset_pk_sequence!('photos')
    ActiveRecord::Base.connection.reset_pk_sequence!('users')
    # ActiveRecord::Base.connection.reset_pk_sequence!('albums')
    # ActiveRecord::Base.connection.reset_pk_sequence!('comments')


  puts "Creating users..."
  zach = User.create!(username: 'Demo', email: 'zach@mail.com', password: 'zachword')
  ben = User.create!(username: 'Squeeze', email: 'ben@mail.com', password: 'benword')
  riley  = User.create!(username: 'Riley Monster', email: 'riley@mail.com', password: 'rileyword')
  charles = User.create!(username: 'Salvage', email: 'charles@mail.com', password: 'charlesword')


#   puts "Creating photos..."
#   photo1 = Photo.create!(title: 'Angler Fish Art Car', user_id: zach.id, description: '')
#   photo1.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+cars/angler-fish-artcar.png"), filename:'angler-fish-artcar.png')
  
#   photo2 = Photo.create!(title: 'Cupcake & Muffin Art Cars', user_id: zach.id, description: 'Driving a Muffin Car Is Fun')
#   photo2.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/cupcakes.png"), filename:'cupcakes.png')
  
#   photo3 = Photo.create!(title: 'Lord Snort', user_id: zach.id, description: 'Got to climb all over this giant galloping wild boar sculpture in 2016! This gnarly swine weighs aprox. 20,000 pounds and is over 20 feet tall and 37 feet long, made out of rusting corrugated metal! ')
#   photo3.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/boar2019.png"), filename:'boar2019.png')
  
#   photo4 = Photo.create!(title: '747 Boeing - 2018', user_id: zach.id, description: 'Yup... thats a real Boeing 747 turned into a giant art car. So dope!! ')
#   photo4.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/boring747.png"), filename:'boring747.png')
  
#   photo5 = Photo.create!(title: 'Big Rig Jig!', user_id: zach.id, description: 'Two real tanker trucks twisted into a 50-foot-tall upright "S." Built for 2009 Burning Man by Mike Ross')
#   photo5.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/big-rig.png"), filename:'big-rig.png')

#   photo6 = Photo.create!(title: "Mowgli's Giant Tortilla Hat", user_id: ben.id, description:'')
#   photo6.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/ben-mowgli-bighat-2022.png"), filename:'ben-mowgli-bighat-2022.png')
  
#   photo7 = Photo.create!(title: 'Dawww', user_id: riley.id, description: 'Amy was pretty surprised <3 ')
#   photo7.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/colly-amy-proposal.png"), filename:'colly-amy-proposal.png')
  
#   photo8 = Photo.create!(title: 'RileyMonster & YanYan', user_id: riley.id, description: '')
#   photo8.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/riley-ash.png"), filename:'riley-ash.png')
  
#   photo9 = Photo.create!(title: 'Temple of Fires BM 2009', user_id: zach.id, description: '')
#   photo9.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/temple/temple-of-fires2009.png"), filename:'temple-of-fires2009.png')
  
#   photo10 = Photo.create!(title: 'Dusty Man 2014', user_id: zach.id, description: 'Caught in a whiteout duststorm on the Janky Barge')
#   photo10.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/the+man/2014-dusty-man.png"), filename:'2014-dusty-man.png')
  
#   photo11 = Photo.create!(title: 'Cheshire Centaur on a Bike in the Desert ', user_id: ben.id, description: '')
#   photo11.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/bikes/bike+3.png"), filename:'bike+3.png')
  
#   photo12 = Photo.create!(title: '2013 Man Burn', user_id: ben.id, description: 'Burn night!')
#   photo12.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/the+man/2013-burn-night.png"), filename:'burn-night.png')
  
#   photo13 = Photo.create!(title: 'Flamingo Bike', user_id: zach.id, description: '')
#   photo13.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/bikes/bike+-+flamingo.png"), filename:'bike+-+flamingo.png')
  
#   photo14 = Photo.create!(title: 'Catmandu Sunrise', user_id: ben.id, description: 'Annual new years day sunrise with Janky Barge and Catmandu')
#   photo14.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/catmandu-sunrise2.png"), filename:'catmandu-sunrise2.png')
  
#   photo15 = Photo.create!(title: 'El Pulpo Mecanico', user_id: ben.id, description: 'Its not burning man until you witness the steampunk octopus with 8 eyes and limb that shoot flames')
#   photo15.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/octopus.png"), filename:'octopus.png')
  
#   photo16 = Photo.create!(title: 'Collin in the Petaled Portal', user_id: ben.id, description: '')
#   photo16.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/colly.png"), filename:'colly.png')
  
#   photo17 = Photo.create!(title: 'Night at the Climb-In', user_id: ben.id, description: '..aka.. the car-kebob! I did not get a chance to climb this beauty before it got shut down from someone falling off of it.')
#   photo17.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/car-kebob+2019.png"), filename:'car-kebob+2019.png')
  
#   photo18 = Photo.create!(title: 'Gaia', user_id: ben.id, description: 'Sometimes you just wanna lay down... naptime is the best time!')
#   photo18.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/lady-resting.png"), filename:'lady-resting.png')
  
#   photo19 = Photo.create!(title: 'THUNDERDOME', user_id: ben.id, description: 'AshYan and Mowgli battle it out in the Thunderdome finally, so epic!!!')
#   photo19.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/camps/thunderdome2.png"), filename:'thunderdome2.png')
  
#   photo20 = Photo.create!(title: 'Costco', user_id: ben.id, description: 'LOL, who comes up with this stuff???')
#   photo20.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/camps/costco-camp.png"), filename:'costco-camp.png')
  
#   photo21 = Photo.create!(title: 'Alien Chess Camp', user_id: riley.id, description: 'Turns out aliens are really good at chess, kinda not surprised...')
#   photo21.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/camps/alien-chess-camp.png"), filename:'alien-chess-camp.png')
  
#   photo22 = Photo.create!(title: 'Flybrarians in the Flybrary', user_id: zach.id, description: '')
#   photo22.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/flybrairie.png"), filename:'flybrairie.png')
  
#   photo23 = Photo.create!(title: 'Robot Heart Sunrise ', user_id: riley.id, description: 'I love when the sound camps art cars join together and create giant massive art car party out in deep playa <3 so magical! ')
#   photo23.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/camps/robotheart.png"), filename:'robotheart.png')
  
#   photo24 = Photo.create!(title: 'Uh...wutt...', user_id: riley.id, description: 'I am so confused by this..how is this running??')
#   photo24.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+cars/hotmess-artcar.png"), filename:'hotmess-artcar.png')
  
#   photo25 = Photo.create!(title: 'Happy day on the Playa', user_id: zach.id, description: '')
#   photo25.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/people.png"), filename:'people.png')

#   photo26 = Photo.create!(title: 'Embrace 2019', user_id: riley.id, description: '')
#   photo26.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/embrace2018.png"), filename:'embrace2018.png')

#   photo27 = Photo.create!(title: 'Facing the FearBeast 2022', user_id: riley.id, description: 'One of my fav art pieces from this year. Made from tires, the FearBeast represents doubts, insecurites, and negative talk you tell yourself. What you do not see in the photo is a child standing in front of the FearBeast. The beast is saying hurtful words, talking down to him. When community gathers around the child, the child starts to glow which represents the spark of life and the power of love. Inside the FearBeast there is a child inside that starts to glow and the realization that you are your own Fearbeast and how community can impower you.')
#   photo27.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+pieces/fearbeast2022.png"), filename:'fearbeast2022.png')

#   photo28 = Photo.create!(title: 'Tea Pots 2016', user_id: riley.id, description: "Have you ever want to cruise around the desert in as a gang of tea pots? Apparently it's been there for two years but I didn't see it until this year... as with all art cars there, you can just climb in any time and enjoy high tea while watching the desert go by out the window...")
#   photo28.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+cars/teapots_2016.png"), filename:'teapots_2016.png')

#   photo29 = Photo.create!(title: '2018 Burn Night', user_id: riley.id, description: 'Watching the man burn from the top of Janky Barge with the Azerban crew')
#   photo29.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/the+man/2018-burn+night.png"), filename:'2018-burn+night.png')

#   photo30 = Photo.create!(title: 'Inside the Temple 2022', user_id: riley.id, description: 'The temple is a very powerful place')
#   photo30.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/temple/temple-notes2.png"), filename:'temple-notes2.png')

#   photo31 = Photo.create!(title: "Dusty Man down 6:00 ", user_id: charles.id, description: '')
#   photo31.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/the+man/dusty-man.png"), filename:'dusty-man.png')
  
#   photo32 = Photo.create!(title: 'Catching the ocean breezes in the desert', user_id: charles.id, description: '')
#   photo32.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+cars/cruiseship-artcar.png"), filename:'cruiseship-artcar.png')

#   photo33 = Photo.create!(title: 'BAAAHS', user_id: charles.id, description: 'big-ass amazingly awesome homosexual sheep')
#   photo33.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+cars/baaah-bus-artcar.png"), filename:'baaah-bus-artcar.png')

#   photo34 = Photo.create!(title: 'Janky Barge', user_id: charles.id, description: "Designed after Jabba's Sail Barge")
#   photo34.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/art+cars/janky+barge.png"), filename:'janky+barge.png')

#   photo35 = Photo.create!(title: "Not The Generals's first redo!", user_id: charles.id, description: 'The Generals 16th burn, and going strong!')
#   photo35.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/bikes/bike+1.png"), filename:'bike+1.png')

#   photo36 = Photo.create!(title: 'Leave your doubts and out-dated stories behind', user_id: charles.id, description: 'All aboard the boeing 747! Tight rules on whats allowed on the plane.')
#   photo36.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/camps/boring747.png"), filename:'boring747.png')

#   photo37 = Photo.create!(title: 'Fish Bike!', user_id: charles.id, description: '')
#   photo37.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/bikes/bike-shark.png"), filename:'bike-shark.png')

#   photo38 = Photo.create!(title: 'Just another night on the Playa', user_id: charles.id, description: 'Looks like the world is ending behind us lol ')
#   photo38.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/austin-ash-2018.png"), filename:'austin-ash-2018.png')

#   photo39 = Photo.create!(title: 'Miss Fields Slayin', user_id: charles.id, description: '')
#   photo39.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/people/ryan-fields.png"), filename:'ryan-fields.png')

#   photo40 = Photo.create!(title: 'Beautiful note inside the temple', user_id: charles.id, description: '')
#   photo40.photo.attach(io: URI.open("https://burnr-seeds.s3.us-west-1.amazonaws.com/temple/temple-note.png"), filename:'temple-note.png')

#   puts "Creating comments..."

#   comment1 = Comment.create!(author_id: ben.id, photo_id: photo2.id, body: "I hope there's A/C or a fan inside those pastries. Could be a personal sauna or a personal cooler! ")
#   comment2 = Comment.create!(author_id: riley.id, photo_id: photo3.id, body: "I was on this! I took a nap and watched the sunset, was magical.")
#   comment3 = Comment.create!(author_id: charles.id, photo_id: photo5.id, body: "I saw this at my first year at BM, so wild that it's actually made out of real trucks")
  # comment4 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment5 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment6 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment7 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment8 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment9 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment10 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment11 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")
  # comment12 = Comment.create!(author_id: zach.id, photo_id: 10, body: "")






end