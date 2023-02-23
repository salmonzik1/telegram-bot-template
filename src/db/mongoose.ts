import { type FilterQuery, Model, model, Schema } from "mongoose";

// deno-lint-ignore no-explicit-any
Model.findOrCreate = function (query: FilterQuery<any>) {
  return this.findOneAndUpdate(
    query,
    {},
    {
      new: true,
      upsert: true,
    },
  );
};

export { model, Schema };
