class Tag < ApplicationRecord
    has_many :joins
    has_many :wines, through: :joins
end
