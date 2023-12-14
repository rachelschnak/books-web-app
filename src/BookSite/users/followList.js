import * as client from "./client";
import * as bookClient from "../client";
import React, {useState, useEffect, useRef} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css"
import {CgProfile} from "react-icons/cg";
import * as likesClient from "../likes/client";
import * as followsClient from "../followers/client";
import {findBookById} from "../client";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import * as reviewsClient from "../reviews/client";
import {createUserReviewsBook} from "../reviews/client";

function FollowList() {
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();
    const [likes, setLikes] = useState([]);
    const [likedBooks, setLikedBooks] = useState([]);
    const [usersReviews, setUsersReviews] = useState(null)
    const [followers, setFollowers] = useState(null)
    const [following, setFollowing] = useState(null)
    const count = useRef(null);
    const fetchAccount = async () => {
        try {
            const account = await client.account();
            setAccount(account);

        } catch (error) {
            console.log(error)
        }
    };

    const fetchProfile = async (id) => {
        try {
            const thisprofile = await client.findUserById(id);
            setProfile(thisprofile);
            if (!thisprofile) {
                navigate("/BookSite/")
            } else {
                fetchBooksUserLikes(thisprofile._id)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const fetchFollowers = async (id) => {
        const followers = await followsClient.findFollowersOfUser(id)
        setFollowers(followers);
    }

    const fetchFollowing = async (id) => {
        const following = await followsClient.findFollowedUsersByUser(id)
        setFollowing(following);
    }

    const save = async () => {
        await client.updateUser(account._id, account);
    };

    const signout = async () => {
        await client.signout();
        navigate("/BookSite/signin");
    };

    const follow = async () => {
        await followsClient.userFollowsUser(id);
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };

    const fetchBooksUserLikes = async (userId) => {
        try {
            const likes = await likesClient.findBooksThatUserLikes(userId);
            for(const each in likes) {
                const bookId = likes[each].bookId;
                fetchBooks(bookId);
            }
            setLikes(likes);
        } catch (error) {
            setLikes(null);
        }
    };

    const fetchBooks = async (bookId) => {
        try {
            const book = await findBookById(bookId)
            setLikedBooks(likedBooks => [...likedBooks, book])
        } catch (error) {
            console.log("didn't fetch any liked books")
        }
    };

    const fetchReviews = async(userId) => {
        try{
            const reviews = await reviewsClient.findReviewsByUser(userId);
            for (const each in reviews) {
                reviews[each].book = await findBookById(reviews[each].bookId)
            }
            setUsersReviews(reviews);
        } catch(error){
            console.log('hit a snag fetching user reviews')
        }
    }

    const slideLeft =  () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        const slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }


    useEffect(() => {
        fetchProfile(id);
        fetchAccount();
        if(count.current == null) {

            fetchFollowers(id);
            fetchFollowing(id)

            return () => {count.current = 1;}
        }


    }, []);

    const links = ["Account", "Signin", "Register"];
    const { pathname } = useLocation();




    return (

        <div className={"row"}>
            <div className="list-group wd-kanbas-user-navigation col-auto d-none d-lg-block">
                {account && (
                    <>
                        <Link to={`/BookSite/Profile/${account._id}`} className="list-group-item books-profile-link-active">
                            Profile
                        </Link>
                    </>
                )}

                <Link to={`/BookSite/Signin`} className="list-group-item books-profile-link">
                    Signin
                </Link>

                <Link to={`/BookSite/Register`} className="list-group-item books-profile-link">
                    Register
                </Link>

                {account && account.role === "ADMIN" && (
                    <>
                        <Link to="/BookSite/admin/users" className="list-group-item books-users-link">
                            Users
                        </Link>
                    </>)}
            </div>

            {profile && (
                <>
                    {account && id === account._id && (
                        <div className={'account-btns-followerList tw-inline'}>

                            <button className={"btn btn-warning profile-button-1 float-end"} onClick={signout}>
                                Signout
                            </button>
                            <button className={"btn btn-primary profile-button-2 float-end"} onClick={() => navigate(`/BookSite/account/${account._id}`)}>
                                Edit Account
                            </button>

                        </div>  )}

            <div className=" col wd-kanbas-user-content d-block">

                <div className={'row'}>

                        <div className={'profile-header follow-list'}><Link to={`/Booksite/Profile/${profile._id}`}>{profile.username}'s</Link> Following List</div>
                        <div className={'follow-list-groups flex-wrap'}>
                            <div className={'follow-list-group flex-wrap col-lg-5'}>
                                <div className={'profile-header'}>
                                    Following </div>
                                        <div className={'list-group profile-list'}>
                                            {following &&
                                             following.map((follow, index) => (

                                                 <Link to={`/BookSite/Profile/${(follow.followed._id)}`}>
                                                    <div className={'list-group-item'}>{follow.followed.username}</div>
                                                 </Link>

                                             ))}
                                        </div>
                                </div>


                                <div className={'follow-list-group flex-wrap col-lg-5'}>
                                    <div className={'profile-header'}>Followers</div>
                                    <div className={'list-group profile-list'}>
                                    {followers &&
                                     followers.map((follower, index) => (
                                         <Link to={`/BookSite/Profile/${(follower.follower._id)}`}>
                                             <div className={'list-group-item'}>{follower.follower.username}</div>
                                         </Link>
                                     ))}
                                    </div>
                                </div>
                        </div>
                </div>
            </div>




                </>
            )}
        </div>
    ); }
export default FollowList;