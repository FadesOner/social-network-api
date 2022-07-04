const User = require("../models/User");

const UserController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .sort({ _id: -1 })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user using id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select("-__v")
      .sort({ _id: -1 })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "There is no users found with this id" });
          return;
        }
        res.json(user);
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a user
  async createUser({ body }, res) {
    try {
      const user = await User.create(body);
      if (!user._id) {
        res.status(400).json({ message: "Bad Request" });
      } else {
        res.json(user);
      }
    } catch ({ message }) {
      res.status(400).json(message);
    }
  },

  // update users using id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "There is no users found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "There is no users found with this id!" });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .json({ message: "Cannot find user with id of " + params.userId });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
};
module.exports = UserController;
