class JoinSerializer < ActiveModel::Serializer
  attributes :id
  has_one :wine
  has_one :tag
end
