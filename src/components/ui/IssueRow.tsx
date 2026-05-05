import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import {
  BookmarkBorder as BookmarkAddIcon,
  Bookmark as BookmarkAddedIcon,
  DeleteOutline as DeleteIcon,
  FiberManualRecord as CircleIcon,
} from '@mui/icons-material';

export interface IssueRowProps {
  id: string | number;
  title: string;
  repoName: string;
  issueUrl: string;
  isOpen?: boolean;
  labels?: { id?: number; name?: string }[];
  dateText: string;
  showStatus?: boolean;
  isSaved?: boolean;
  actionType: 'save' | 'remove';
  onAction: (e: React.MouseEvent) => void;
  isLast?: boolean;
}

export const IssueRow: React.FC<IssueRowProps> = ({
  id,
  title,
  repoName,
  issueUrl,
  isOpen,
  labels,
  dateText,
  showStatus = false,
  isSaved = false,
  actionType,
  onAction,
  isLast = false,
}) => {
  const owner = repoName.split('/')[0];

  return (
    <Box
      key={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 1.25,
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          '& .action-btn': { opacity: 1 },
        },
      }}
      onClick={() => window.open(issueUrl, '_blank')}
    >
      {/* Dynamic Leading Icon (Status or Bookmark) */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 24 }}>
        {showStatus ? (
          <CircleIcon sx={{ fontSize: 12, color: isOpen ? 'success.main' : 'error.main' }} />
        ) : (
          <BookmarkAddedIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
        )}
      </Box>

      {/* Org Avatar */}
      <Avatar
        src={`https://github.com/${owner}.png?size=48`}
        sx={{
          width: 18,
          height: 18,
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      />

      {/* Title & Labels */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'text.primary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>

        {labels && labels.length > 0 && (
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 0.5, flexShrink: 0 }}>
            {labels.slice(0, 3).map(label => (
              <Box
                key={label.id}
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: '4px',
                  fontSize: '0.6875rem',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                {label.name}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Repo & Time */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
        <Typography
          sx={{
            fontSize: '0.8125rem',
            color: 'text.secondary',
            width: { xs: 80, sm: 140 },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'right',
            display: { xs: 'none', md: 'block' },
          }}
        >
          {repoName}
        </Typography>

        <Typography
          sx={{
            fontSize: '0.8125rem',
            color: 'text.disabled',
            width: actionType === 'remove' ? 80 : 60,
            textAlign: 'right',
          }}
        >
          {dateText}
        </Typography>

        {/* Action Button */}
        <IconButton
          className="action-btn"
          size="small"
          onClick={onAction}
          disabled={actionType === 'save' && isSaved}
          sx={{
            opacity: actionType === 'save' && isSaved ? 1 : { xs: 1, sm: 0 },
            transition: 'opacity 0.2s',
            width: 28,
            height: 28,
            color: actionType === 'save' && isSaved ? 'text.primary' : 'text.disabled',
            '&:hover': {
              color: actionType === 'save' ? 'text.primary' : 'error.main',
              backgroundColor:
                actionType === 'save' ? 'rgba(255,255,255,0.1)' : 'rgba(239, 68, 68, 0.1)',
            },
          }}
        >
          {actionType === 'save' ? (
            isSaved ? (
              <BookmarkAddedIcon fontSize="small" />
            ) : (
              <BookmarkAddIcon fontSize="small" />
            )
          ) : (
            <DeleteIcon fontSize="small" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
