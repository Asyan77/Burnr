# == Schema Information
#
# Table name: favorites
#
#  id         :bigint           not null, primary key
#  user_id    :bigint
#  photo_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Favorite < ApplicationRecord
    validates :user_id, :photo_id, presence: true

    belongs_to :user
    belongs_to :photo_id
    has_many :photos, dependent: :destroy
end
