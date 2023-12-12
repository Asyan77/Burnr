# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  comment    :text             not null
#  user_id    :bigint
#  photo_id   :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Comment < ApplicationRecord
    validates :comment, presence: true
    belongs_to :user
    belongs_to :photo


end
