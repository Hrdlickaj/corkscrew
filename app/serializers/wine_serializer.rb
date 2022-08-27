class WineSerializer < ActiveModel::Serializer
  attributes :id, :name, :vintage, :country, :region, :grape, :rating, :image, :memory, :tasting
  has_one :user
end
