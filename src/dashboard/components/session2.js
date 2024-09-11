import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk } from '@clerk/clerk-react';
import axios from "axios";
import './styles/session2.css'

function Session2() {
    const { user } = useClerk();
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false); // New state for "Show more"

    useEffect(() => {
      const fetchAds = async () => {
        try {
          const response = await axios.get(`https://yepper-backend.onrender.com/api/importAds/ads/${user.id}`);
          if (response.status !== 200) {
            throw new Error('Failed to fetch ads');
          }
          const data = response.data;
          if (Array.isArray(data)) {
            setAds(data); // Directly setting the array of ads
          } else {
            console.error('Received data is not an array:', data);
          }
          setLoading(false);
        } catch (error) {
          if (!error.response) {
            setError('No internet connection');
          } else {
            setError('Error fetching ads');
          }
          setLoading(false);
        }
      };
      if (user) {
        fetchAds();
      }
    }, [user]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return (
        <div className="error-container">
          <div>{error}</div>
        </div>
      );
    }

    const adsToShow = showMore ? ads.slice().reverse() : ads.slice().reverse().slice(0, 3);
  
  return (
    <div className='posts-container'>
        <div className='object'>
            <div className='title'>
                <h4>{ads.length}</h4>
                <h3>Ads</h3>
            </div>

            <div className='updates'>
                {ads.length > 0 ? (
                    adsToShow.map((ad, index) => (
                        <div key={index} className='update'>
                            {ad.imageUrl && <img src={`https://yepper-backend.onrender.com${ad.imageUrl}`} alt="Ad Image" className="ad-image" />}
                            {ad.pdfUrl && <a href={`https://yepper-backend.onrender.com${ad.pdfUrl}`} target="_blank" rel="noopener noreferrer" className="ad-pdf">View PDF</a>}
                            {ad.videoUrl && (
                                <video controls className="ad-video">
                                <source src={`https://yepper-backend.onrender.com${ad.videoUrl}`} type="video/mp4" />
                                Your browser does not support the video tag.
                                </video>
                            )}
                            <div className='word'>
                                <label>{ad.adDescription}</label>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-ads">No ads available</div>
                )}
            </div>
            <Link to='/ads' className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
            
        </div>

        <div className='object media'>
            <div className='title'>
                <h4>21</h4>
                <h3>Apps</h3>
            </div>

            <div className='updates'>
                <div className='update'>
                    <div className='views'>
                        <label>324 Views, 21 Comments</label>
                    </div>
                    
                    <div className='app'>
                        <img src='https://cdn-icons-png.flaticon.com/128/2111/2111463.png' alt='' />
                        <div className='word'>
                            <label>Instagram</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>

                <div className='update'>
                    <div className='views'>
                        <label>324 Views, 21 Comments</label>
                    </div>
                    
                    <div className='app'>
                        <img src='https://cdn-icons-png.flaticon.com/128/5968/5968830.png' alt='' />
                        <div className='word'>
                            <label>(X)Twitter</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>

                <div className='update'>
                    <div className='views'>
                        <label>324 Views, 21 Comments</label>
                    </div>
                    
                    <div className='app'>
                        <img src='https://cdn-icons-png.flaticon.com/128/3536/3536505.png' alt='' />
                        <div className='word'>
                            <label>LinkedIn</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>
            </div>

            <Link className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>

        <div className='object media webs'>
            <div className='title'>
                <h4>21</h4>
                <h3>Websites</h3>
            </div>

            <div className='updates'>
                <div className='update'>
                    
                    <div className='app'>
                        <img src='data:image/jpeg;base64,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' alt='' />
                        <div className='word'>
                            <label>Igihe</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>

                <div className='update'>
                    
                    <div className='app'>
                        <img src='data:image/png;base64,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' alt='' />
                        <div className='word'>
                            <label>Catchyz</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>

                <div className='update'>
                    
                    <div className='app'>
                        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEUAAAD////8/Pzz8/MEBASkpKROTk4vLy8MDAzW1ta4uLjAwMD29vaRkZFycnLIyMgfHx+srKxiYmLT09Pn5+eAgICLi4vf39/MzMzu7u4+Pj5kZGSenp6YmJi6urqrq6tFRUU3NzeBgYFYWFgoKCgWFhZ2dnZsbGwjIyNSUlJbW1syMjIZGRmoG7v4AAAO8UlEQVR4nO1diZaiOhAlAe1WUUZFcRftVnuZ//++l4QsVSGgbxq3PrlnzgwTQsilkkpRVcEg8PDw8PDw8PDw8PDw8PDw8PDw8PDwuANGx3v34Ir4biVzQrJ7d6MB/Jm68BG89IcpIZ17d68B7AghMeVgB1QdLPip1q9h2BMHbULJmzjaSIbb38EwJ2QkDkZEHX0R8sn/Hf4Ohm9KmxiGQUZO/J9fwnBClsUBYPhGxCrxSxiuZkEQ8QPAMOi1+N+a4fd76bLd4kb9axCQYfDK/yoYDjpcyXZfi+cgHsckIyEl2V4VPQkgw6LngmGHhFnI1Oz8oGvOyPg7CJYhmd2hmz8AkqEAY5jNuzk7+mQiS5TEMqmbcrXOPAucDEMx3SKmeyiRk7ErV8so6FHrggeHk6HWpSEhE3GwM4UnwgT7RKhnyNTNWhx01QEzaZmVd7PuNYB6hmNCtuIg5LadnJFs6L7croM/xlmGYo18YbX06hgT0r5Z/36Oyxgy+5xuerNxls7nbG6Srxv38ie4jCGzyil7f+wzrNfrVWt3417+BJcxfGMMb9yxxnAZwxzOwyfDZQwP5Lm0C8RlDIOUkL6pEj2T7X0hwxZ2wD03w62LIV8QB4IYk9/r+KZd/CEuZBisCI0Lj1XwSfvBk4CL5FP62sy4a2GGK3nYYxWT/ddpnTHSTzNK2y3+Jk/oeKUU5cdalGTrjyB4X6f8eNz/I071uUeV157cr8P/G8vJ8XgcDAbHifRLBbsJLzgeJ8xqWez5ucFxL+zsKIgmw9m4O3kuPePh4eHh4eHh8YR4cnPrjYRxHIcSubNOh/I6vBL/h+xv28Of4r2VEgVKQ4fjKApOM2IwHz6TU7DAd79D1DtOWjEoT5uYP4Fsld+4cw1A+Ic0Q3diE6/S42cXzzorX8EoTCpIJOSJfYOAIaWk667zWxjyobh2ejZ/D0NG0elS+U0MKVk6pPiLGHKOjhSf38WQxH9KdWoYXryA3G+lsRhyy6VUp16G73k7v8TWiUoHpf9cBWWG5TS8aoZ5qxNLi6i7NP3tl7GGo3+qi5FmW5jqg2sypKRnPdkqhsfMXMOF31cU4/JjI7rPUTAFxX9BeydTvLkmQ9bdIa7jZviWSmbhvLiMklAlJEznyhhUQ/9kLvwk1JxEMZu2fBVIPpsj6GIo7gulWGLIF5SWpDVnrHZamOsiXZENVEQRmryHOak4E4iMI5J9NMjPzZA9YrSBwiXDmZRD/FcMzVBd2FIVQsgQZi3kUIR2LhE/M21W/QiG88QaVDwBxtzGwXCsLjjyenBqTYqwqJSxKYXXQqxgs0vebMMZDoJhGGQEg9Lc1Ckz7CqCammJ1BPSuYnvqD2YujdAZ1LY7pA0vztFMIzZ5MBCpJSt/EqKFsMomBDFcKsKO/pSlS87Q+MC3hONX9awGS1c0zQdL5YMgxdqUzQP15bhwdRVYUQ4KGXNE2IIJvYI3Qgq7h3/f9NJfpJhJKLXiCJf+Qsr3GbYNXX0nDmaK9VahnRm4ri8QGjO9Ks8DQ0wDMQsRxxNQrPFEMwwY+EtwZWyCOkaoE1DzBDkPXAdtA4ahmIYYVODQNVvMRyaOuaBv4AnsyyeDNQ1YP15s/X2BvTlCpmoRob8odsDtS/GqcUQyACMPXCdWhOhJ9Jks295w87FcsCKkWptmmFkzxCx8pcYfroeP2KotOkJtqW1KZ+eXXRGmax8DULLY9MMA7CQa/BUZsxwDc4C1xUo1XJAdo3kkYv7ObUQHxz5lRnaKz9bFhe2DOHY25qGQKnUjlGwgm3JYdoSh/AxEXLQ3JsfpDbD17m1LpL4YDFMwUkwpsoMua4BjcUF67RQRQTapoVNtybArL0Wwyh4j8srP2YIz/f26+2ml3TScG5zEUC6RlgHC1Kolg08U7xz8wBDfm2GjGKORcjuOu5BhtjBCh+FLjPNIbtGDNMV4Y7niDGFF3PfUESuMkhthgE3qqxxSoVYdSIbljBxoGJ1F3dJ1SbbDryC26JHdmYbNI8yQ25X4w5TyPAFntoGHy+7xWKR5+3259doeRocJ/v+VLVk6ZqRsAJoYQgh8XLLoSes8JswFFO+BHXzP7CwItBhgN6hNsVSI7UJWjAWQtxhfWP/hjLDqLTyI4bIKWD7rGxESNfExWokvW592FBL7BEf1jbWGEOOWXmCOXXp+f2/wCJnE/AA7TLY+lyM5yYdUBouhlFp5YcM4ei6YFgZXcOU6F7Et+RNwEhhy0RGHb7oJuCWYfCa2lLUDJGb5bxbDJrz8w4FLw9oweBr7lUGaQXDKPiIqxiC1z5KTvaVJUDNxLWyfuFCc1R8heKtMVYQFTIMgp0lRM0QvuueVaaRZddQMjUnl+jEdTRpDUPbnWKWKljqvBLjhNuB4zpFZ84uPf+GSoaRMDLKDCNmUupyy3VcnLdjrMiYR3tL0IKhXANNo1qGlmfeyDCHxWX9t7DjRsiuwWF0+AgvGA7/hDqGwRBwAQYV1BB8bJlHzz+kQG0F+wGfCDwRQZdPk+EmhFqGwlYsM/xGFjeylvOxYz6BJ2JtW9+BR3VeLf8b6hhG8A0A+ryB4cq4jnXw8zR2Zo8BXWOPYE2eXkmTnpMhU3dKXMjs7xGEbNjvr4YiHEypI+IdKjmVds5+6Wd1tS9LRGcY/lFWF2Co3G9GjHqouaPh2kjYWOKNzIJxlUHK73bQa22Fqv4uXg/tng9db1jMtMxdbWh/TXnT+lRd+SMmlThMx7z7lMa9qtQAGdCwXk7Z0zjNywxJEqkYMK4tp5trrsmYf3KNxXCBTYrKr8gMyvNQYJoS5QAo0FlWjQRpn7lM620h36t8tS8fJwjuWqzLe3Zy5voc0tc20/zmwzrDeV7xlLRX5B/6fxaXjoqqerI8/zpO9oO3v/VNjvgX+txZ4gN+qsH8GQ8PDw+PWyAKPvq9cSfhO0ie6osdl2OtrOiq/RdPiqiQF3rvvkaw654o5PUJ/UzN5w00iv5m070Ym57M1h3W+5keCvAt9QJI/1GGIuz3ZXAOiermOdBqhuWtCY+EgiENs1QCcZ2nVrFkCAMvTyJDrS0OSHC6WIU8JUPkhx4/8nIhXQfAP4si8CBzRboYVCKl9k5QcqVoUGMofJ3GAVLFUIZglBdwYWKak0cWYVBEdqAHqYqhDPjqiq9DwTFOHv47zqKfwL9UybDwSauEZi62Xbu9CB7fZouthNRKhnwmVmyufGi8UsHDyKGaoTjzNN9U09jZUZJqhqW0QLOTzvbCR6DGRdvsKsqjS64uleKCT7wtpJYhX+dxaGQ36WaUOrzEf5erTkj1d5634zScd3rTv6jOcThO5/N0tqrLkPk4DjtpGKbj7rRy/+LroDXLwnCejbv9kb2ZZmJr+zqGr3PS0ZVH65n0tUsi8s0qWEw3crXMeOWPLdiGt9Hr7gjmJqTOiEtUROIMsvJX3SKrJYZwtp28GQ0/oFY6ah3DYEHFwrmYbGCykGLI/ixbYyvVDkWv2ZQ4iT7mHVzMx0Z5DH6lVi2S4pAAe6YL1RK2rPVLa2mi1DIsanep1aIejEJ01OTYZzzqgVLu5Ya3lb1rg5ZMv6j4DgWvlh3z0ZgU0SFbEUx1UGTcPx7XvVDcrTabv1aGAh37iSmGE2LlknbeXK8su8AWoPNWf6UA5TTXG6SAtEHeJlUL9bLowU8YRsHr13TozszLjy3wbkKp46WMkqw09oryb3Sb91BeXGxkUZkM+KsVE/1Ej4VC1ymTP5KhAKyEcg9haJsxnPVP7dPK2g7LBlFr0P6adtBbJk6zUBLUG4ASXfGohPhH7/aDMUeh2GoC/k0yJF2lOpFKpHq/L3wJoyiKbnbtKe2vkpKpqWjcYXDBKt4RbsTQFMON24AK8KFQE92Ogr0u1jl8L6aissHMCEC5K3s+dvPbMFTuDSuh2Hg9vuDwNRvSIvNuZvpuymJ1sbMLEVsC68zLqzC0Et/N+o6ypVV4G6W2myxFraBUnhzcUmN+1oVf/z2uyfC7EkO0rXfibsdMJjCmzdMApkthO25NAbWj74vql7pbMJy629EZiWCrKcl1VbCBptCUMN+NzLhSU68A0Ws1wYdgCH24Ji8FTuVDiSHjeGGY/44MdTswt9pUhYTEnlnk8BNG3TB/DoYoed3NUKiaN1JGBtp+XIZI77oZFi2UbEIuyPjcLugHYAhfuOjrLh8dp/3VEL2w8dUugsoUIjzWusfuzjCyTFvXoVzPD+5NcZWflHsQhlbSpouDZBiVvg6gL6oLNDwYQzKY7Pf8x3bWq1ZrO+xuer1eksiFgduvbjHWpdo+GsPqngbKBHVSrE5jfACGqAlHJirCAe0VNqh+Bb47Q+s9JK8nyKZbzjmW52Plz2M9AENkq1xiih2m5X2C1fkTd2do1T2f6CHM7d3W/hhK5W8NPgBDtBF8Vqn3v9/xqdOYVO6dejCGaANq5R6IKYnhb/Vwssjce2iGSD0uAzd4PHNgCRjuL3/kUVp8ruxcT1+IY0MpcA5Udv0RGAbom2I5EhSP/3yLEu5vptZyqb3pNXvAHoIh+lQT/upVxMeiULDCM2VF9ow5RA9BBR6CYQBjAyBSocJWYjUfC7scTtNI75+vM0wfg2Eb+fs7Zjdmu6e/qlDIC0g4MvPQjoI8HkOkFXma7mTxvmvvh+JboRm6EwwgD/RVNT9x9gi+tiJFt+KjLySNwJ0o7YBEkrmqU7U9q9iIB7EqisvPw+6ZrgEYipQ+GYNFu9H3Z9sR+gSK0URlM1UpUUHTmVSbS70fvOZ3Bt+GSFHTOJkcrFyLiP84HLR0KR1rJ/Zghh58NpBX9NEuvbAlo/6nTlxqR99rFJbEiBwUy45hniW9xNyi8sMSec+2XgU6yEEXBUdXCDdpB8GiF5fcDnPOsVUOlW5ZQ6cUV+fHMzWt+ANYlcZpOoJi3hW/vSHD3GoLYOezcvfAlOrfIoGgKR6lPVctOuVZD+XymGvtueMCVtwt148p9ndO0JiYlVfxXX+Gh0f3Kh93uRaEKPLpqpckSbc/KgumkNXLst/aJLOkt9rnovR6Hbpay493Vw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw+P/4//AHqguc1IBxnqAAAAAElFTkSuQmCC' alt='' />
                        <div className='word'>
                            <label>NewTimes</label>
                        </div>
                    </div>

                    <div className='proceed'>
                        <Link to='/'>See more</Link>
                    </div>
                </div>
            </div>

            <div className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </div>
        </div>

        <div className='object gmails'>
            <div className='title'>
                <h4>12</h4>
                <h3>Emails</h3>
            </div>

            <div className='updates'>
                <div className='update'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='' />
                    <div className='word'>
                        <label>Mugabo</label>
                    </div>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968534.png' alt=''/>
                </div>

                <div className='update'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='' />
                    <div className='word'>
                        <label>Mugabo</label>
                    </div>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968534.png' alt=''/>
                </div>

                <div className='update'>
                    <img src='https://cdn-icons-png.flaticon.com/128/3135/3135715.png' alt='' />
                    <div className='word'>
                        <label>Mugabo</label>
                    </div>
                    <img src='https://cdn-icons-png.flaticon.com/128/5968/5968534.png' alt=''/>
                </div>
            </div>

            <Link className='showMore'>
                Show more
                <img src='https://cdn-icons-png.flaticon.com/128/8213/8213522.png' alt='' />
            </Link>
        </div>
    </div>
  )
}

export default Session2