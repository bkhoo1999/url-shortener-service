class StringUtil
	URL_REGEX = /\A(?:(?:http|https):\/\/)?([-a-zA-Z0-9.]{2,256}\.[a-z]{2,4})\b(?:\/[-a-zA-Z0-9@,!:%_\+.~#?&\/\/=]*)?\z/
	UNIQUE_SLUG_LENGTH = 6

	def generate_slug
		return ([*('a'..'z'),*('0'..'9')]).sample(UNIQUE_SLUG_LENGTH).join
	end
end