# Twitch Redeem&Command Alert API

## URLs

### `/u(ser)/:uid`
> `:uid` has to be integer or string (username) 
Example Result:
```json
{
  "id": 1,
  "createdAt": "2020-10-30T18:33:31.853Z",
  "name": "<username>",
  "email": "<email>"
}
```

### `/u(ser)/:uid/c(ommand)s`
> `:uid` has to be integer or string (username) 
Example Result:
```json
[
  {
    "id": 1,
    "createdAt": "2020-11-01T20:28:32.717Z",
    "name": "yolo",
    "text": "hallo welt",
    "access": 4,
    "gif": "https://media.giphy.com/media/3ov9k7W6qpJPyFmHuM/giphy.gif",
    "sound": "Magic_Chime.mp3",
    "volume": 0.3,
    "duration": 2,
    "cooldown": 60
  },
  ...
]
```


### `/u(ser)/:uid/r(edeem)s`
> `:uid` has to be integer or string (username) 
Example Result:
```json
[
  {
    "id": 1,
    "createdAt": "2020-11-01T21:52:01.111Z",
    "name": "yolo",
    "text": "hallo welt",
    "gif": "https://media.giphy.com/media/3ov9k7W6qpJPyFmHuM/giphy.gif",
    "sound": "horn.wav",
    "volume": 0.5,
    "duration": 10
  },
  ...
]
```


## TODOs: