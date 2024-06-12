import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Typography,
    TextField,
    IconButton,
    Card,
    CardContent,
    CardActions,
    Collapse,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getQuestions, editQuestion, deleteQuestion, editAnswer, deleteAnswer } from '../../../store/Actions/forumActions';

const AdminForum = () => {
    const dispatch = useDispatch();
    const { questions } = useSelector(state => state.forum);
    const [expanded, setExpanded] = useState(null);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editingAnswer, setEditingAnswer] = useState(null);
    const [questionContent, setQuestionContent] = useState('');
    const [answerContent, setAnswerContent] = useState('');

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    const handleExpandClick = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question._id);
        setQuestionContent(question.content);
    };

    const handleSaveQuestion = (id) => {
        dispatch(editQuestion(id, { content: questionContent }));
        setEditingQuestion(null);
    };

    const handleDeleteQuestion = (id) => {
        dispatch(deleteQuestion(id));
    };

    const handleEditAnswer = (questionId, answer) => {
        setEditingAnswer({ questionId, answerId: answer._id });
        setAnswerContent(answer.content);
    };

    const handleSaveAnswer = (questionId, answerId) => {
        dispatch(editAnswer(questionId, answerId, { content: answerContent }));
        setEditingAnswer(null);
    };

    const handleDeleteAnswer = (questionId, answerId) => {
        dispatch(deleteAnswer(questionId, answerId));
    };

    const renderHTML = (html) => {
        return { __html: html };
    };

    return (
        <Box>
            {questions.map(question => (
                <Card key={question._id} sx={{ mb: 3, borderRadius: 10, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                    <CardContent sx={{ bgcolor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
                        <Typography variant="h6" color="textPrimary">
                            {editingQuestion === question._id ? (
                                <>
                                    <TextField
                                        value={questionContent}
                                        onChange={(e) => setQuestionContent(e.target.value)}
                                        fullWidth
                                    />
                                    <Button onClick={() => handleSaveQuestion(question._id)} variant="contained" color="primary" sx={{ ml: 1 }}>Save</Button>
                                    <Button onClick={() => setEditingQuestion(null)} variant="contained" color="error" sx={{ ml: 1 }}>Cancel</Button>
                                </>
                            ) : (
                                <>
                                    <div dangerouslySetInnerHTML={renderHTML(question.content)} />
                                    <IconButton onClick={() => handleEditQuestion(question)} sx={{ ml: 'auto' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteQuestion(question._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <IconButton
                            onClick={() => handleExpandClick(question._id)}
                            aria-expanded={expanded === question._id}
                            aria-label="show answers"
                            sx={{ color: '#268077' }}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded === question._id} timeout="auto" unmountOnExit>
                        <CardContent sx={{ bgcolor: '#f8f9fa', borderRadius: 10 }}>
                            <Typography variant="h6" color="textPrimary" sx={{ mb: 2 }}>
                                Answers
                            </Typography>
                            {question.answers.length === 0 ? (
                                <Typography variant="body1" color="textSecondary">No answers yet</Typography>
                            ) : (
                                <List>
                                    {question.answers.map(answer => (
                                        <ListItem key={answer._id} sx={{ bgcolor: '#e9ecef', mb: 1, borderRadius: 5 }}>
                                            <ListItemText
                                                primary={
                                                    editingAnswer?.answerId === answer._id ? (
                                                        <>
                                                            <TextField
                                                                value={answerContent}
                                                                onChange={(e) => setAnswerContent(e.target.value)}
                                                                fullWidth
                                                            />
                                                            <Button onClick={() => handleSaveAnswer(question._id, answer._id)} variant="contained" color="primary" sx={{ ml: 1 }}>Save</Button>
                                                            <Button onClick={() => setEditingAnswer(null)} variant="contained" color="error" sx={{ ml: 1 }}>Cancel</Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div dangerouslySetInnerHTML={renderHTML(answer.content)} />
                                                            <IconButton onClick={() => handleEditAnswer(question._id, answer)} sx={{ ml: 'auto' }}>
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => handleDeleteAnswer(question._id, answer._id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </>
                                                    )
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </Box>
    );
};

export default AdminForum;
