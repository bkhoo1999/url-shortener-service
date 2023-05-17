class Link < ApplicationRecord
    UNIQUE_SLUG_LENGTH = 6
    URL_REGEX = /\A(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@,!:%_\+.~#?&\/\/=]*)?\z/
    
    validates :original_url, presence: true, on: :create_table
    validates_format_of :original_url, with: URL_REGEX
    before_create :generate_slug, :retrieve_title
    has_many :transactions
    attr_accessor :request

    def generate_slug
        new_url_slug = ([*('a'..'z'),*('0'..'9')]).sample(UNIQUE_SLUG_LENGTH).join
        existing_url_slug = Link.where(url_slug: new_url_slug).first
        if existing_url_slug.present?
            self.generate_slug
        else 
            self.url_slug = new_url_slug
            self.short_url = "#{@request.protocol}#{@request.host_with_port}/#{new_url_slug}"
        end
    end

    def retrieve_title
        self.title = Mechanize.new.get(self.original_url).title || nil
    end

end
