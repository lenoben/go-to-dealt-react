# Download dependencies
```sh
go mod download
go mod tidy
```
# For go reload
```sh
go install github.com/air-verse/air@latest
```

# To initialize a new go project
```sh
go mod init github.com/<username>/<repo_name>
```
use `go get <package>` to download dependency

## sample go+mongo code
```go

import (
  "context"
  "fmt"

  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
  // Use the SetServerAPIOptions() method to set the version of the Stable API on the client
  serverAPI := options.ServerAPI(options.ServerAPIVersion1)
  opts := options.Client().ApplyURI("mongodb+srv://<username>:<password>@cluster0.oeursta.mongodb.net/?appName=Cluster0").SetServerAPIOptions(serverAPI)

  // Create a new client and connect to the server
  client, err := mongo.Connect(context.TODO(), opts)
  if err != nil {
    panic(err)
  }

  defer func() {
    if err = client.Disconnect(context.TODO()); err != nil {
      panic(err)
    }
  }()

  // Send a ping to confirm a successful connection
  if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
    panic(err)
  }
  fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}
```

```sh
mongodb+srv://<username>:<password>@cluster0.oeursta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

# Client vite react app
from start
```sh
npm create vite@latest client
cd client
npm install
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion #charka-ui
npm i react-icons #icons
npm i @tanstack/react-query #for effective query in react
```

# Production build
```sh
go build -tags netgo -ldflags '-s -w' -o app
./app
```