# == Schema Information
#
# Table name: photos
#
#  id          :bigint           not null, primary key
#  title       :string           not null
#  user_id     :bigint
#  description :text
#  tag         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Photo < ApplicationRecord
    validates :title, :user_id, presence: true

    belongs_to :user
    has_many :comments
    has_many :comment_authors, through: :comments
    has_one_attached :photo
end
