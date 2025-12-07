import React from "react";
import { useOnePosts, usePosts } from "../utils/query";

const Posts: React.FC = () => {

    const { data: post, isLoading: isPostLoading } = usePosts();
    const {data: onePost, isLoading: isOnePostLoading} =  useOnePosts('2');
   
   console.log(onePost)
   console.log("A")
   console.log("B")

    return (
        <div>
            {
                post?.map((post) => {
                    return (
                        <div key={post.id}>
                            <h2 className="text-green-300 text-2xl">{post?.title} the</h2>
                        </div>
                    );
                 }
                )
            }

            <div className="w-[12px]">
                <div className="w-[12px]">

                </div>
            </div>
           
        </div>
    );
};

export default Posts;