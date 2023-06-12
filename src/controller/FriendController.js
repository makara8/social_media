const User = require("../models/User");

const FrindController = {
  addUnfriend: async (req, res) => {
    const { current_user_id, friend_id } = req.body;
    const current_user = await User.findById(current_user_id);
    const friend = await User.findById(friend_id);

    if (current_user.friends.includes(friend_id)) {
      current_user.friends = current_user.friends.filter(
        (id) => id !== friend_id
      );
      friend.friends = friend.friends.filter((id) => id !== current_user_id);
    } else {
      current_user.friends.push(friend_id);
      friend.friends.push(current_user_id);
    }
    await current_user.save();
    await friend.save();
    return res.json(current_user);
  },
  getAllFrindAndNotFrind: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      const friends = [];
      await Promise.all(
        user.friends.map(async (friend_id) => {
          const friend = await User.findById(friend_id);
          if (friend) {
            const formated = {
              _id: friend.id,
              username: friend.username,
              profile_picture_path: friend.profile_picture_path,
            };
            friends.push(formated);
          }
        })
      );

      const all_user = await User.find();

      const not_friends = [];

      await Promise.all(
        all_user.map(async (single_user) => {
          if (!user.friends.includes(single_user.id)) {
            const not_friend = await User.findById(single_user.id);
            if (not_friend && single_user.id !== id) {
              const formated = {
                _id: not_friend.id,
                username: not_friend.username,
                profile_picture_path: not_friend.profile_picture_path,
              };
              not_friends.push(formated);
            }
          }
        })
      );
      res.json({
        friends,
        not_friends,
      });
    } catch (err) {
      res.json(err.message);
    }
  },
};

module.exports = FrindController;

/*const User = require("../models/User");

const FrindController = {
  addUnfriend: async (req, res) => {
    const { current_user_id, friend_id } = req.body;
    const current_user = await User.findById(current_user_id);
    const friend = await User.findById(friend_id);

    if (current_user.friends.includes(friend_id)) {
      current_user.friends = current_user.friends.filter((id) => id !== friend_id);
      friend.friends = friend.friends.filter((id) => id !== current_user_id);
    } else {
      current_user.friends.push(friend_id);
      friend.friends.push(current_user_id);
    }
    await current_user.save();
    await friend.save();
    return res.json(current_user);
  },
  getAllFrindAndNotFrind: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      const friends = [];

      await Promise.all(
        user.friends.map(async (friend_id) => {
          const friend = await User.findById(friend_id);
          if (friend) {
            const formated = {
              _id: friend.id,
              username: friend.username,
              profile_picture_path: friend.profile_picture_path,
            };
            friends.push(formated);
          }
        })
      );

      const all_user = await User.find();

      const not_friends = [];
      await Promise.all(
        all_user.map(async (single_user) => {
          if (!user.friends.includes(single_user.id)) {
            const not_friend = await User.findById(single_user.id);
            if (not_friend && single_user.id !== id) {
              const formated = {
                _id: not_friend.id,
                username: not_friend.username,
                profile_picture_path: not_friend.profile_picture_path,
              };
              not_friends.push(formated);
            }
          }
        })
      );
      res.status(200).json({
        friends,
        not_friends,
      });
    } catch (error) {
      res.json(error.message);
    }
  },
};

module.exports = FrindController;*/
