package events

import (
	"github.com/jitsucom/jitsu/server/logging"
	"github.com/jitsucom/jitsu/server/meta"
	"github.com/jitsucom/jitsu/server/queue"
	"io"
	"time"
)

//TimedEvent is used for keeping events with time in queue
type TimedEvent struct {
	Payload      map[string]interface{}
	DequeuedTime time.Time
	TokenID      string
}

//Queue is an events queue. Possible implementations (dque, leveldbqueue, native)
type Queue interface {
	io.Closer
	Consume(f map[string]interface{}, tokenID string)
	ConsumeTimed(f map[string]interface{}, t time.Time, tokenID string)
	DequeueBlock() (Event, time.Time, string, error)
}

type QueueFactory struct {
	redisPool        *meta.RedisPool
	redisReadTimeout time.Duration
}

func NewQueueFactory(redisPool *meta.RedisPool, redisReadTimeout time.Duration) *QueueFactory {
	return &QueueFactory{redisPool: redisPool, redisReadTimeout: redisReadTimeout}
}

func (qf *QueueFactory) CreateEventsQueue(identifier string) (Queue, error) {
	//DEPRECATED
	//queueName = "queue.dst="+destinationID,  logEventPath = f.logEventPath
	//return NewDQueBasedQueue(identifier, queueName, logEventPath)
	//return NewLevelDBQueue(identifier, queueName, logEventPath)

	var underlyingQueue queue.Queue
	if qf.redisPool != nil {
		logging.Infof("[%s] initializing redis events queue", identifier)
		underlyingQueue = queue.NewRedis(queue.DestinationNamespace, identifier, qf.redisPool, TimedEventBuilder, qf.redisReadTimeout)
	} else {
		logging.Infof("[%s] initializing inmemory events queue", identifier)
		underlyingQueue = queue.NewInMemory()
	}
	return NewNativeQueue(queue.DestinationNamespace, identifier, underlyingQueue)
}

func (qf *QueueFactory) CreateHTTPQueue(identifier string, serializationModelBuilder func() interface{}) queue.Queue {
	if qf.redisPool != nil {
		return queue.NewRedis(queue.HTTPAdapterNamespace, identifier, qf.redisPool, serializationModelBuilder, qf.redisReadTimeout)
	} else {
		return queue.NewInMemory()
	}
}

func (qf *QueueFactory) Close() error {
	if qf.redisPool != nil {
		return qf.redisPool.Close()
	}

	return nil
}

func logSkippedEvent(event Event, err error) {
	logging.Warnf("Unable to enqueue object %v reason: %v. This object will be skipped", event, err)
}