# == Schema Information
#
# Table name: faves
#
#  id         :bigint           not null, primary key
#  photo_id   :bigint
#  user_id    :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Fave < ApplicationRecord
    validates :photo_id, uniqueness: { scope: :user_id }
    belongs_to :photo
    belongs_to :user


end
