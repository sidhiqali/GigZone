import User from '../mongoDB/models/userSchema.js';
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.userId !== user._id.toString()) {
      return res.status(403).send('you can delete only you account');
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('deleted successfully');
  } catch (error) {
    console.log(error);
    res.send(error)
  }
};
