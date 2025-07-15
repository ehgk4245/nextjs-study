"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";

interface PostType {
  id: number;
  title?: string;
  body?: string;
}

interface Comment {
  id: number;
  contents: string;
  post_id: number;
}

interface PostContextType {
  post: PostType | null;
  comments: Comment[];
  newComment: string;
  setNewComment: (value: string) => void;
  isSubmitting: boolean;
  isLoading: boolean;
  fetchData: () => Promise<void>;
  handleSubmitComment: (e: React.FormEvent) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data: post, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();

      const { data: comments } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", params.id);

      if (postError) {
        console.error("Error fetching post:", postError);
        alert("글을 불러오는 중 오류가 발생했습니다.");
        router.push("/posts");
        return;
      }

      setPost(post);
      setComments(comments || []);
    } catch (error) {
      console.error("Error:", error);
      alert("데이터를 불러오는 중 오류가 발생했습니다.");
      router.push("/posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("comments")
        .insert([
          {
            contents: newComment,
            post_id: Number(params.id),
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting comment:", error);
        alert("댓글 작성 중 오류가 발생했습니다.");
      } else {
        setNewComment("");
        // 댓글 목록 새로고침
        const { data: updatedComments } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", params.id);
        setComments(updatedComments || []);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const value: PostContextType = {
    post,
    comments,
    newComment,
    setNewComment,
    isSubmitting,
    isLoading,
    fetchData,
    handleSubmitComment,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within PostProvider");
  }
  return context;
} 