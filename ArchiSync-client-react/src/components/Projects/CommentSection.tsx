"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Send, ThumbsUp, Reply, MoreHorizontal } from "lucide-react"
import Button from "../S/Button"
import { cn } from "../S/utils"

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatarUrl?: string
  }
  timestamp: Date
  likes: number
  liked?: boolean
  replies?: Comment[]
}

interface CommentSectionProps {
  comments: Comment[]
  onAddComment?: (content: string, parentId?: string) => void
  onLikeComment?: (id: string) => void
}

const CommentSection = ({ comments, onAddComment, onLikeComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    if (onAddComment) {
      onAddComment(newComment)
    }
    setNewComment("")
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return

    if (onAddComment) {
      onAddComment(replyContent, parentId)
    }
    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (id: string) => {
    if (onLikeComment) {
      onLikeComment(id)
    }
  }

  const renderComment = (comment: Comment, isReply = false) => {
    return (
      <div key={comment.id} className={cn("comment", isReply && "reply")}>
        <div className="comment-avatar">
          {comment.author.avatarUrl ? (
            <img src={comment.author.avatarUrl || "/placeholder.svg"} alt={comment.author.name} />
          ) : (
            <div className="avatar-initials">
              {comment.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="comment-content">
          <div className="comment-header">
            <span className="comment-author">{comment.author.name}</span>
            <span className="comment-time">{formatDistanceToNow(comment.timestamp, { addSuffix: true })}</span>
          </div>

          <div className="comment-text">{comment.content}</div>

          <div className="comment-actions">
            <button className={cn("action-button", comment.liked && "liked")} onClick={() => handleLike(comment.id)}>
              <ThumbsUp size={14} />
              <span>{comment.likes > 0 ? comment.likes : ""}</span>
            </button>

            <button className="action-button" onClick={() => setReplyingTo(comment.id)}>
              <Reply size={14} />
              <span>Reply</span>
            </button>

            <button className="action-button">
              <MoreHorizontal size={14} />
            </button>
          </div>

          {replyingTo === comment.id && (
            <div className="reply-form">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="reply-input"
              />
              <div className="reply-actions">
                <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleSubmitReply(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="replies">{comment.replies.map((reply) => renderComment(reply, true))}</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="comment-section">
      <h3 className="section-title">Comments</h3>

      <form className="comment-form" onSubmit={handleSubmitComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <Button type="submit" variant="primary" icon={<Send size={16} />} disabled={!newComment.trim()}>
          Comment
        </Button>
      </form>

      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  )
}

export default CommentSection
