// C
module.exports.convertTime = (text) => {
  let days = 0;
  if (
    text.toLowerCase().includes("days") ||
    text.toLowerCase().includes("day")
  ) {
    days += parseFloat(text);
  }
  if (
    text.toLowerCase().includes("hours") ||
    text.toLowerCase().includes("hour")
  ) {
    days += Math.ceil(parseFloat(text) / 24);
  }
  return days;
};

module.exports.buildQueries = (queries = {}) => {
  const {
    date,
    description,
    min_applications,
    max_applications,
    min_duration,
    max_duration,
    min_budget,
    max_budget,
    buyerUserName,
    tags,
  } = queries;

  let result = {}
  if (date) {
    result["date"] = { "$regex": `${date}`, "$options": "i" }
  }
  if (description) {
    result["description"] = { "$regex": `${description}`, "$options": "i" };
  }
  if (min_applications) {
    result["applications"] = {
        ...result["applications"],
        $gt:Number( min_applications)-1
    }
  }
  if (max_applications) {
    result["applications"] = {
        ...result["applications"],
        $lt:Number( max_applications )+1
    }
  }
  if (min_duration) {
    result["duration"] = {
        ...result["duration"],
        $gt:Number( min_duration)-1
    }
  }
  if (max_duration) {
    result["duration"] = {
        ...result["duration"],
        $lt:Number( max_duration)+1
    }
  }
  if (min_budget) {
    result["budget"] = {
        ...result["budget"],
        $gt:Number( min_budget)-1
    }
  }
  if (max_budget) {
    result["budget"] = {
        ...result["budget"],
        $lt:Number( max_budget)+1
    }
  }
  if (buyerUserName) {
    result["buyerUserName"] = { "$regex": `${buyerUserName}`, "$options": "i" };
  }
  if (tags) {
    result["tags"] = { "$regex": `${tags}`, "$options": "i" };
  }

  console.log({result});

  return result;
//   Person.
//   find({
//     occupation: /host/,
//     'name.last': 'Ghost',
//     age: { $gt:Number( 17, $lt:Number( 66 },
//     likes: { $in: ['vaporizing', 'talking'] }
//   }).
//   limit(10).
//   sort({ occupation: -1 }).
//   select({ name: 1, occupation: 1 }).
//   exec(callback);

};
