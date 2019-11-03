const _ = require('lodash');

const formatInput = (hashTags) => {
    let cleanedHashTags = hashTags.split(" ").
    map((hashTag) => (hashTag.startsWith('#') ? hashTag : `#${hashTag}`)); //Just incase someeone enters more than one hashtag

    const uniqueHashTags = _.uniqWith(cleanedHashTags, _.isEqual); //make sure there are no repetitions

    return uniqueHashTags.map((hashTags) => encodeURIComponent(hashTags));
};

module.exports = formatInput;