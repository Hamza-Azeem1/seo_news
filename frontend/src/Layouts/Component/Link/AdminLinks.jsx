// AdminLinks.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButton } from '@mui/material';
import { approveLink, deleteLink } from '../../../store/Actions/linkActions';

const AdminLinks = () => {
    const links = useSelector(state => state.links.links);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const dispatch = useDispatch();

    const handleApprove = (index) => {
        dispatch(approveLink(index));
    };

    const handleDelete = (index) => {
        dispatch(deleteLink(index)); // Dispatch the deleteLink action with the index
    };

    const toggleExpand = (index) => {
        setExpandedIndex(index === expandedIndex ? -1 : index);
    };

    const approvedLinks = links.filter(link => link.approved);
    const pendingLinks = links.filter(link => !link.approved);

    return (
        <div>
            <Typography variant="h4" style={{ marginBottom: '20px', color: 'green' }}>Approved Links</Typography>
            {approvedLinks.map((link, index) => (
                <Card key={index} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5">Title: {link.title}</Typography>
                        {expandedIndex === index && (
                            <Typography variant="body1">Link: {link.link}</Typography>
                        )}
                        <IconButton
                            aria-label={expandedIndex === index ? 'Hide Link' : 'Show Link'}
                            color="primary"
                            onClick={() => toggleExpand(index)}
                            style={{ marginTop: '10px' }}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardContent>
                    <div>
                        <IconButton aria-label="approve" color="primary" onClick={() => handleApprove(index)}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Card>
            ))}
            {approvedLinks.length === 0 && (
                <Typography variant="body1" style={{ fontSize: '1.2rem', color: 'black' }}>No approved links found.</Typography>
            )}

            <Typography variant="h4" style={{ marginBottom: '20px', marginTop: '40px', color: 'Red' }}>Pending Links</Typography>
            {pendingLinks.map((link, index) => (
                <Card key={index} style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5">Title: {link.title}</Typography>
                        {expandedIndex === index + approvedLinks.length && (
                            <Typography variant="body1">Link: {link.link}</Typography>
                        )}
                        <IconButton
                            aria-label={expandedIndex === index + approvedLinks.length ? 'Hide Link' : 'Show Link'}
                            color="primary"
                            onClick={() => toggleExpand(index + approvedLinks.length)}
                            style={{ marginTop: '10px' }}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardContent>
                    <div>
                        <IconButton aria-label="approve" color="primary" onClick={() => handleApprove(index + approvedLinks.length)}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={() => handleDelete(index + approvedLinks.length)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Card>
            ))}
            {pendingLinks.length === 0 && (
                <Typography variant="body1" style={{ fontSize: '1.2rem', color: 'black' }}>No pending links found.</Typography>
            )}
        </div>
    );
};

export default AdminLinks;
